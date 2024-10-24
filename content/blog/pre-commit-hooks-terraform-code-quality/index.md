---
id: 1efbed99ec76873a51674ec1
path: "/blog/pre-commit-hooks-terraform-code-quality/"
date: "2024-10-24 21:06:00"
published: true
title: "A Guide to using Pre-commit hooks for Terraform: Save time and improve code quality 🪝"
cover: "./hooks-cover.jpg"
excerpt: "Learn how to automate Terraform code checks and enforce security standards using pre-commit hooks, saving time and improving code quality."
keywords:
  - Terraform
  - Pre-commit Hooks
  - Code Quality
  - Automation
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Automate Terraform Code Checks and and Security Standards ↪️**

## ☁️ Introduction

In the ever-changing world of tech, it is essential to ensure the quality and security of your code. However, manually running command-line checks before every commit can be a time-consuming and tedious task. In this blog post, we will introduce you to Pre-commit hooks, a powerful tool that can help you automate code quality checks. Pre-commit hooks for Terraform are scripts that run automatically before you commit your code.

They can be used to check for a variety of errors, such as linting errors, security vulnerabilities, and formatting issues.

This blog post is designed for both experienced and inexperienced Terraform users. We will cover the basics of [Terraform pre-commit hooks](https://github.com/antonbabenko/pre-commit-terraform) and how to use them with Terraform. We will also provide some tips on how to choose the right hooks for your needs.

Let's get started! 💪

## 📍 What is pre-commit

[Pre-commit hooks](https://pre-commit.com/#install) are essential scripts that automatically execute before committing your code changes. They serve a critical role in identifying various types of issues, including linting errors, security vulnerabilities, and formatting inconsistencies. This robust pre-commit process ensures the highest quality and safety of your code, making it ready for deployment.

[Terraform](https://developer.hashicorp.com/terraform/downloads), on the other hand, is a powerful open-source infrastructure as code (IaC) tool that empowers users to create, modify, and enhance infrastructure in a reliable and predictable manner. It achieves this by converting infrastructure into a configuration language, which can be efficiently managed using version control tools.

Now, let's explore some of the most popular [pre-commit hooks tailored for Terraform](https://github.com/antonbabenko/pre-commit-terraform):

- **[terraform-docs](https://github.com/terraform-docs/terraform-docs)**: This hook meticulously inspects your Terraform configuration files, detecting and correcting documentation errors.
- **[tflint](https://github.com/terraform-linters/tflint)**: With this hook, your Terraform configurations undergo a thorough linting process to identify and rectify errors.
- **[tfsec](https://github.com/aquasecurity/tfsec)**: Ensuring security is paramount, and tfsec specializes in scanning Terraform configurations for potential vulnerabilities.
- **[checkov](https://github.com/bridgecrewio/checkov)**: This hook evaluates your Terraform configurations against a predefined set of security best practices, ensuring robust security posture.
- **[terrascan](https://github.com/tenable/terrascan)**: Compliance with security standards is vital, and terrascan evaluates your configurations for adherence to these standards.
- **[infracost](https://github.com/infracost/infracost)**: Providing financial insights, this hook estimates the cost implications of running your Terraform configurations.
- **[tfupdate](https://github.com/minamijoyo/tfupdate)**: Stay up-to-date with Terraform providers by using this hook to check for updates and improvements.
- **[minamijoyo/hcledit](https://github.com/minamijoyo/hcledit)**: Code readability and maintainability are enhanced with this hook, which refines your Terraform configurations.
- **[jq](https://github.com/jqlang/jq)**: A versatile command-line JSON processor, jq is used to manipulate and refine Terraform configuration files as needed.
- **[Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/)**: A thin wrapper that provides extra tools for keeping your configurations DRY, working with multiple Terraform modules, and managing remote state.
- **[Terraform Validate](https://www.terraform.io/docs/commands/validate.html)**: A native Terraform command that validates the configuration files in a directory, referring only to the configuration and not accessing any remote services such as remote state, provider APIs, etc.
- **[Terraform Fmt](https://www.terraform.io/docs/commands/fmt.html)**: A Terraform command that is available natively and is used to rewrite Terraform configuration files to a canonical format and style. This command applies a subset of the [Terraform language style conventions](https://www.terraform.io/docs/configuration/style.html), along with other minor adjustments for readability.

### 🛠️ Setting Up Pre-commit Hooks for Terraform

To globally install the pre-commit hook and configure it for use with Terraform, follow these steps:

1. **Install Pre-Commit Globally (Not Needed if Using Docker Image):**

```sh
DIR=~/.git-template
git config --global init.templateDir ${DIR}
pre-commit init-templatedir -t pre-commit ${DIR}
```
    *Note: If you're already using a Docker image, you can skip this step.*

2. **Add Configurations and Hooks:**
Navigate to the repository where you want to set up the pre-commit hooks, and perform the following steps:

```sh
git init
cat <<EOF > .pre-commit-config.yaml
default_install_hook_types:
    - pre-commit
    - commit-msg

repos:
# BASIC CONF FOR ALL PRE-COMMITS REPO TYPE
    - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
        - id: trailing-whitespace
        stages: [commit]
        - id: end-of-file-fixer
        exclude: /secrets
        stages: [commit]
        - id: check-added-large-files
        stages: [commit]
        - id: check-yaml
        args:
        - '--allow-multiple-documents'
        exclude: /templates|/secrets
        stages: [commit]
        - id: check-json
        stages: [commit]
        - id: check-toml
        stages: [commit]
        - id: check-shebang-scripts-are-executable
        stages: [commit]

    - repo: https://github.com/compilerla/conventional-pre-commit
    rev: v2.1.1
    hooks:
        - id: conventional-pre-commit
        stages: [commit-msg]

    - repo: https://github.com/gitleaks/gitleaks
        rev: v8.16.1
        hooks:
        - id: gitleaks

# SPECIFIC CONF FOR TERRAFORM MODULE REPOSITORIES
    - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.77.1
    hooks:
        - id: terraform_fmt
        args:
        - --args=-diff
        - --args=-write=true
        stages: [commit]
        - id: terraform_docs
        stages: [commit]
        - id: terraform_tflint
        files: \.tf$
        args:
            - --args=--config=__GIT_WORKING_DIR__/.tflint.hcl
        stages: [commit]
        - id: terraform_tfsec
        files: \.tf$
        args:
            - >
            --args=--config-file=__GIT_WORKING_DIR__/.tfsec.yml
            --var-file tests/terraform.tfvars
        stages: [commit]
EOF
```

 Make sure to replace `<VERSION>` with the latest available version from the provided URL.

3. **Running the Pre-Commit Hook:**

After configuring the pre-commit hook, you can either install it globally or run it manually. In this example, we'll manually run the pre-commit hook:

```sh
pre-commit run -a
```

## 📚 Closing Thoughts

By leveraging pre-commit hooks, you can seamlessly integrate various open-source and Terraform-native tools into your workflow, all through a unified automation tool. This approach shifts the responsibility of enforcing code quality to pre-commit hooks, reducing the workload on downstream continuous integration (CI) systems. Additionally, it allows for the swift identification and resolution of minor issues with each commit, resulting in cleaner pull requests and reduced review time.

<br><br>

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

  
**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
