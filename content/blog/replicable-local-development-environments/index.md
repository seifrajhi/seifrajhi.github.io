---
id: 1e48fef829399cc6b9f3e30e
path: "/blog/replicable-local-development-environments/"
date: "2024-10-15 18:06:00"
published: true
title: "Minimizing local machine dependencies with replicable development environments 📈"
cover: "./dev-env-cover.png"
excerpt: "Modular Docker builds, Devcontainer Integration,Nix Package Manager, Home-Manager, Dotfiles"
keywords:
  - NixOS
  - Isolation
  - Shareability
  - Security
  - Local Development
  - Cloud native
  - Devcontainer
  - Nix
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Isolated, shareable, and secure local setup strategies 🔥**

## 📚 Introduction

The modern software development relies heavily upon external libraries, frameworks, and packages to expedite project delivery.

While these dependencies offer many benefits, they also introduce potential risks, such as [**remote code execution (RCE)**](https://www.cloudflare.com/en-gb/learning/security/what-is-remote-code-execution/) vulnerabilities.

To address these concerns, we will explore various strategies and tools designed to minimize local machine dependencies and establish replicable development environments.

We will explore the specifics of [modular Dockerfile builds](https://earthly.dev/blog/repeatable-builds-every-time/), [Dev Containers](https://containers.dev/), [Nix configurations](https://nixos.wiki/wiki/Configuration_Collection), and customization techniques!

<div class="important">
    <p><strong>❗ Important:</strong></p>
    <p>This article serves as a follow-up to <a href="https://seifrajhi.github.io/blog/devcontainers-replicable-local-setup/">my previous blog on DevContainers</a>, continuing the exploration of effective methods to mitigate dependency management challenges.</p>
</div>

Let’s get started :)

## Optimize Developer workflows with Modular Docker builds and Devcontainer integration

To maximize the effectiveness of containerized development environments, it is imperative to use **modular Dockerfile structures** and integrate **dev container solutions**.

The provided `Dockerfile` snippet highlights a modular approach using a configurable base image, tailored specifically for `CUDA profiling` with `TensorFlow`.

```shell
# Make this Dockerfile modular by using a configurable base image
ARG BASE_IMAGE
FROM ${BASE_IMAGE}
# For CUDA profiling, TensorFlow requires CUPTI.
ENV LD_LIBRARY_PATH /usr/local/cuda/extras/CUPTI/lib64:/usr/local/cuda/lib64:$LD_LIBRARY_PATH
# Link the libcuda stub to the location where Tensorflow is searching for it and reconfigure
# dynamic linker run-time bindings
RUN ln -s /usr/local/cuda/lib64/stubs/libcuda.so /usr/local/cuda/lib64/stubs/libcuda.so.1 \
  && echo "/usr/local/cuda/lib64/stubs" > /etc/ld.so.conf.d/z-cuda-stubs.conf \
  && ldconfig
```

While containerization brings many advantages, it does not inherently solve the issue of managing developer experience.

Then check out DevContainer, a great tool that simplifies tasks like cache ordering and configuration management.

Below is an example of a `DevContainer JSON configuration snippet` that illustrates its capabilities:

```json
{
"image": "mcr.microsoft.com/vscode/devcontainers/base:jammy",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {},
    "ghcr.io/devcontainers/features/python:1": {}
  }
}
```

With DevContainer integrated into containerized environments, developers can enhance their workflow efficiency, reduce cognitive load, and focus on coding tasks without being hindered by setup complexities.

This combination of containerization with tools like Docker and DevContainer not only boosts security and reproducibility but also elevates the overall developer experience, fostering a more productive and collaborative development environment across projects.

Because we want to encourage cross-team collaboration, we want to standardize the tooling across teams as much as possible.

Different language ecosystems will have different tools and we want to keep using those. You can't tell the frontend team not to use `package.json` / `npm` / `Yarn` etc - that would be cumbersome for them. _So we're not touching the language-specific build layer._

In addition, because we want to be able to iterate quickly when there are CI failures, we will containerize the build as much as possible. If the failure is part of a containerized script, then it will be easier to reproduce it locally.

Three prominent approaches for achieving this include:

* **Makefile + Dockerfile:** Using Makefiles as a collection of daily commands (e.g., `make build`, `make start`, `make package`, `make test`) complements Dockerfiles, keeping most of the build contained within containers.
* **bash + Dockerfile:** Another alternative involves collecting scripts for everyday tasks within a dedicated directory (e.g., `./build`, `./test`, `./release`).
* **Bake + Dockerfile:** Using [bake](https://github.com/SanderMertens/bake) as a collection of daily commands (e.g., `bake build`, `bake start` , etc) .

All these approaches enable the quick reproduction of issues during Continuous Integration (CI) failures since the failing actions occur within containerized scripts.

<div class="note">
    <p><strong>🔵 Note:</strong></p>
    <p><a href="https://github.com/tsuru/docker-nginx-with-modules">Here</a>
, you can find a project that contains a Dockerfile that allows you to create a custom Docker image with any number of additional dynamic modules, using makefile.
</p>
</div>

## Simplifying system sependencies with Nix Package manager

While containerization and modular builds offer significant benefits, heavy system dependencies like OpenSSL, QEMU, and CUDA can still pose challenges.

To address this issue, Nix - a Unix-like package manager - provides a solution that is operating system-neutral, versioned, and reproducible.

Nix can install virtually anything in a truly reproducible way, similar to `package-lock.json`, making it an ideal choice for managing system dependencies.

The following example demonstrates how Nix can be used to simplify system dependencies:

```json
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    devenv.url = "github:cachix/devenv";
  };

  outputs = { nixpkgs, devenv, ... }@inputs: {
    devShells = nixpkgs.lib.genAttrs nixpkgs.lib.platforms.unix (system:
      let pkgs = import nixpkgs { inherit system; }; in {
        default = devenv.lib.mkShell {
          inherit inputs pkgs;
          modules = [
            {
              pre-commit.hooks = {
                eslint.enable = true;
                prettier.enable = true;
                black.enable = true;
                isort.enable = true;
              };
              packages = [
                pkgs.python
                pkgs.nodejs
              ];
            }
          ];
        };
      }
    );
  };
}
```


By combining `Nix` with `[direnv](https://direnv.net/)` and the associated VSCode extension, changes made in the repository can be instantly reflected without rebuilding the entire container.

To automatically switch nix shells when switching projects, you can do this by using [nix-direnv](https://github.com/nix-community/nix-direnv) and the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=mkhl.direnv) direnv for integration. View the nix-direnv github page linked for a guide on setting it up.

The `.envrc` file below demonstrates how to create a development environment and predefine a Google Cloud project for convenience

```shell
# .envrc
# Create the development environment
use flake
# Predefine a Google Cloud project if not provided for convenience
export GOOGLE_PROJECT_ID=${GOOGLE_PROJECT_ID:-foobar}
# Fetch Google Application Credential from Vault
if [ ! -f key.json ]; then
  vault kv get -field=keyfile $GOOGLE_PROJECT_ID > key.json
fi
```

## More customization with Home-Manager and Dotfiles

[Home-Manager](https://nix-community.github.io/home-manager/) and [Dotfiles](https://www.webpro.nl/articles/getting-started-with-dotfiles) offer a wealth of possibilities for customizing and optimizing your development environment.

Here are two lightweight examples to demonstrate the usage of these tools:

### Home-Manager example

Create a basic Home-Manager configuration file named `~/.config/homebrew/home.nix`:

```shell
{
  imports = [
    "./overrides.nix"
  ];

  env.extraPackages = with pkgs; [
    vim
    nodejs
    yarn
  ];

  services.vscode = {
    enable = true;
    extraArgs = ["--user-data-dir=$HOME/.cache/code"];
  };
}
```

Then, define overrides in `~/.config/homebrew/overrides.nix`:

```shell
{
  vim.packages = [
    pkgs.vimPlug // Install Vim Plugins
  ];
}
```

This example sets up a basic development environment with `Vim`, `NodeJS`, `Yarn`, and `VSCode` configured to store user data in `$HOME/.cache/code`.

### Dotfiles example

Create a [ZSH](https://github.com/ohmyzsh/ohmyzsh) configuration file named `~/.zshrc`:

```shell
# Enable plugins
plugins=(git z shocks)

# Configure plugins
source $(brew --prefix zsh-syntax-highlighting)/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
autoload -U compinit && compinit

# Alias
alias ll='ls -lahG'
alias grep='grep --color=auto'
alias diff='diff --color'
alias history="fc -lr"

# Prompt
ZSH_THEME="robbyrussell"

# Color scheme
LS_COLORS="di=34;46:ln=35;43:so=35;43:pi=35;43:ex=35;41:bd=43;34:cd=36;43:su=35;40:sg=36;40:tw=32;41:ow=33;42:st=37;44:"
```

This example sets up a basic `ZSH configuration` with **syntax highlighting**, **colorful output**, **useful aliases**, and a **custom prompt theme**.

## 📌 Final thoughts

Using tools like Docker, Makefile, Nix, Direnv, Home-Manager, and [Dotfiles](https://www.webpro.nl/articles/getting-started-with-dotfiles) to create secure, reliable, and efficient development environments.

Prioritize security measures and adapt to new developments to safeguard your digital assets and propel the software industry forward.

**_Until next time, つづく 🎉 🇵🇸_**

<br><br>

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**References:**

* [Visual Studio Code and NixOS](https://nixos.wiki/wiki/Visual_Studio_Code)
* [Nix Ecosystem](https://nixos.wiki/wiki/Nix_Ecosystem)
* [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
* [DevContainers Overview](https://containers.dev/overview)
* [Nix Home Manager](https://nix-community.github.io/home-manager/)
  
**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
