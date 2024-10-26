---
id: 3122edc02ad207afbacd08a3
path: "/blog/skaffold-automate-your-kubernetes-deployments/"
date: "2024-10-26 22:00:00"
published: true
title: "Skaffold: Automate Your Kubernetes Deployments and Save Time 🐳"
cover: "./Skaffold-cover.jpg"
excerpt: "Discover how Skaffold streamlines Kubernetes deployments, automating container image updates and saving valuable time."
keywords:
  - Skaffold
  - Kubernetes
  - automation
  - Platform engineering
  - DevOps
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Automated Container Image Updating for Kubernetes**

## 🔊 Introduction

Traditional container image updating processes often involve multiple steps and can be time-consuming, especially when dealing with large and complex applications. The manual nature of these processes can also lead to inconsistencies and errors, making it challenging to maintain a seamless deployment workflow.

[Skaffold](https://skaffold.dev/) addresses these challenges by automating the container image updating process, allowing developers to focus on writing code rather than managing the deployment pipeline. By continuously monitoring for changes in the source code, Skaffold triggers the build, push, and deploy workflow seamlessly, ensuring that the latest version of the code is always reflected in the container image.

![Skaffold](./Skaffold.png)

## 🏗 What is Skaffold

Skaffold is a command line tool that provides continuous development for applications released to either local or remote Kubernetes clusters.

Skaffold aims to [simplify the cloud-native development journey for software developers](https://nortal.com/blog/enhancing-the-kubernetes-native-developer-experience-using-skaffold/), and is particularly helpful for software teams that would benefit from:

- **Application debugging**
- **A toolkit to create continuous integration/continuous delivery pipelines**
- **An automated approach to building Docker images and Kubernetes YAML manifest image tagging**
- **Quick reflections of source code changes in their Kubernetes clusters**

Skaffold is an open-source project from Google that has been generally available since November 7, 2019, and is released under the Apache 2.0 license.

### 📌 Features

- **Fast local Kubernetes Development**
  
    - Optimized "Source to Kubernetes": Skaffold detects changes in your source code and handles the pipeline to build, push, test, and deploy your application automatically with policy-based image tagging and highly optimized, fast local workflows.
    - Continuous feedback: Skaffold automatically manages deployment logging and resource port-forwarding.
- **Skaffold projects work everywhere**
    - Share with other developers: Skaffold is the easiest way to share your project with the world: `git clone` and `skaffold run`.
    - Context aware: Use Skaffold profiles, local user config, environment variables, and flags to easily incorporate differences across environments.
    - Platform aware: Use cross-platform and multi-platform build support, with automatic platform detection, to easily handle operating system and architecture differences between the development machine and Kubernetes cluster nodes.
- **CI/CD building blocks**
    - Use `skaffold build`, `skaffold test`, and `skaffold deploy` as part of your CI/CD pipeline, or simply `skaffold run` end-to-end.
    - GitOps integration: Use `skaffold render` to build your images and render templated Kubernetes manifests for use in GitOps workflows.
- **skaffold.yaml**
    - A single pluggable, declarative configuration for your project.
- **skaffold init**
    - Skaffold can discover your build and deployment configuration and generate a Skaffold config.
- **Multi-component apps**
    - Skaffold supports applications with many components, making it great for microservice-based applications.
- **Bring your own tools**
    - Skaffold has a pluggable architecture, allowing for different implementations of the build and deploy stages.
- **Lightweight**
    - Client-side only: Skaffold has no cluster-side component, so there's no overhead or maintenance burden to your cluster.
    - Minimal pipeline: Skaffold provides an opinionated, minimal pipeline to keep things simple.

### Skaffold Workflow and Architecture

Skaffold simplifies your development workflow by organizing common development stages into one simple command. Every time you run `skaffold dev`, the system:

1. Collects and watches your source code for changes.
2. Syncs files directly to pods if user marks them as syncable.
3. Builds artifacts from the source code.
4. Tests the built artifacts using container-structure-tests or custom scripts.
5. Tags the artifacts.
6. Pushes the artifacts.
7. Deploys the artifacts.
8. Monitors the deployed artifacts.
9. Cleans up deployed artifacts on exit (Ctrl+C).

## 🚀 How to Implement Skaffold

In this section, we walk through running Skaffold on a small Kubernetes app built with Docker inside minikube and deployed with kubectl.

### Prerequisites

- **minikube**
- **Skaffold**
- **Docker Hub Account** (or another container registry, like Amazon ECR, GitLab Container Registry, or Google Container Registry)

**In this quickstart, you will**

- Use `skaffold init` to bootstrap your Skaffold config.
- Use `skaffold dev` to automatically build and deploy your application when your code changes.
- Use `skaffold build` and `skaffold test` to tag, push, and test your container images.
- Use `skaffold render` and `skaffold apply` to generate and deploy Kubernetes manifests as part of a GitOps workflow.

### Set up and hands-on

This tutorial requires Skaffold, minikube, and kubectl.

1. **Install Skaffold**: [Installation Guide](https://skaffold.dev/docs/install/)
2. **Install kubectl**: [Installation Guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
3. **Install minikube**: [Installation Guide](https://minikube.sigs.k8s.io/docs/start/)

This tutorial uses minikube because Skaffold knows how to build the app using the Docker daemon hosted inside minikube. This means we don't need a registry to host the app's container images.

### Clone the sample app

Let's get a sample application set up to use Skaffold.

```bash
git clone https://github.com/GoogleContainerTools/skaffold
cd skaffold/examples/buildpacks-node-tutorial
```

### Initialize Skaffold

Your working directory is the application directory, `skaffold/examples/buildpacks-node-tutorial`. This will be our root Skaffold directory. This sample application is written in Node, but Skaffold is language-agnostic and works with any containerized application.

#### Bootstrap Skaffold configuration

Run the following command to generate a `skaffold.yaml` config file:

```bash
skaffold init
```

When asked which builders you would like to create Kubernetes resources for, press enter to accept the default selection. When asked if you want to write this configuration to `skaffold.yaml`, type "y" for yes.

Open your new `skaffold.yaml`, generated at `skaffold/examples/buildpacks-node-tutorial/skaffold.yaml`. All of your Skaffold configuration lives in this file. We will go into more detail about how it works in later steps.

### Use Skaffold for continuous development

Skaffold speeds up your development loop by automatically building and deploying the application whenever your code changes.

#### Start minikube

To see this in action, let's start up minikube so Skaffold has a cluster to run your application.

```bash
minikube start --profile custom
skaffold config set --global local-cluster true
eval $(minikube -p custom docker-env)
```

This may take several minutes.

#### Use `skaffold dev`

Run the following command to begin using Skaffold for continuous development:

```bash
skaffold dev
```

Notice how Skaffold automatically builds and deploys your application. You should see the following application output in your terminal:

```shell
Example app listening on port 3000!
```

To browse to the web page, open a new terminal and run:

```bash
minikube tunnel -p custom
```

Now open your browser at [http://localhost:3000](http://localhost:3000). This displays the content of `public/index.html` file.

Skaffold is now watching for any file changes and will rebuild your application automatically. Let's see this in action.

Open `skaffold/examples/buildpacks-node-tutorial/src/index.js` and change line 10 to the following:

```javascript
app.listen(port, () => console.log(`Example app listening on port ${port}! This is version 2.`))
```

Notice how Skaffold automatically hot reloads your code changes to your application running in minikube, intelligently syncing only the file you changed. Your application is now automatically deployed with the changes you made, as it prints the following to your terminal:

```shell
Example app listening on port 3000! This is version 2.
```

#### Exit dev mode:
Let's stop continuous dev mode by pressing the following keys in your terminal:

```bash
Ctrl+C
```

Skaffold will clean up all deployed artifacts and end dev mode.

### Use Skaffold for continuous integration

While Skaffold shines for continuous development, it can also be used for continuous integration (CI). Let's use Skaffold to build and test a container image.

#### Build an image

Your CI pipelines can run `skaffold build` to build, tag, and push your container images to a registry.

Try this out by running the following command:

```bash
export STATE=$(git rev-list -1 HEAD --abbrev-commit)
skaffold build --file-output build-$STATE.json
```

Skaffold writes the output of the build to a JSON file, which we'll pass to our continuous delivery (CD) process in the next step.

#### Test an image

Skaffold can also run tests against your images before deploying them. Let's try this out by creating a simple custom test.

Open your `skaffold.yaml` and add the following test configuration to the bottom, without any additional indentation:

```yaml
test:
- image: skaffold-buildpacks-node
    custom:
        - command: echo This is a custom test command!
```

Now you have a simple custom test set up that will run a bash command and await a successful response.

Run the following command to execute this test with Skaffold:

```bash
skaffold test --build-artifacts build-$STATE.json
```

### Use Skaffold for continuous delivery

Let's learn how Skaffold can handle continuous delivery (CD).

#### Deploy in a single step

For simple deployments, run `skaffold deploy`:

```bash
skaffold deploy -a build-$STATE.json
```

Skaffold hydrates your Kubernetes manifest with the image you built and tagged in the previous step, and deploys the application.

#### Render and apply in separate steps

For GitOps delivery workflows, you may want to decompose your deployments into separate render and apply phases. That way, you can commit your hydrated Kubernetes manifests to source control before they are applied.

Run the following command to render a hydrated manifest:

```bash
skaffold render -a build-$STATE.json --output render.yaml --digest-source local
```

Open `skaffold/examples/buildpacks-node-tutorial/render.yaml` to check out the hydrated manifest.

Next, run the following command to apply your hydrated manifest:

```bash
skaffold apply render.yaml
```

You have now successfully deployed your application in two ways.

_Congratulations, you successfully deployed with Skaffold! 🎉_

You have learned how to use Skaffold for continuous development, integration, and delivery.

## 📑 Conclusion

As Kubernetes applications become more prevalent in the software development landscape, software teams, and businesses should encourage and enable their developers to make use of Kubernetes in a way that doesn't complicate their inner development loop.

Software developers' primary concern should be using efficient workflows to deliver high-quality software, and the complexities of Kubernetes shouldn't get in their way.

Skaffold is a tool that automates and abstracts the workflow for software developers, allowing for cloud-native development with Kubernetes without compromising on developer experience, efficiency, or best practices.

<br>

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** [https://www.linkedin.com/in/rajhi-saif/](https://www.linkedin.com/in/rajhi-saif/)

**♻️ X/Twitter:** [https://x.com/rajhisaifeddine](https://x.com/rajhisaifeddine)

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
