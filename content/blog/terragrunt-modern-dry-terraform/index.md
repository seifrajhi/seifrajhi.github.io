---
id: 3597d0823b9a7bbbee55cad6
path: "/blog/terragrunt-modern-dry-terraform/"
date: "2024-10-23 20:06:00"
published: true
title: "Terragrunt: A Modern Way to Keep Your Terraform Code DRY and Maintainable"
cover: "./tg-dry-cover.png"
excerpt: "Discover how Terragrunt can revolutionize your Terraform workflow by keeping your code DRY and maintainable. Learn best practices and tips for efficient infrastructure as code (IaC) management."
keywords:
  - Terragrunt
  - terraform
  - IAC
  - automation
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Dry Terraform code with Terragrunt ♨️**

## 💬 Introduction

Terraform is an excellent infrastructure-as-code tool, but it can be challenging to keep your code **DRY** (Don't Repeat Yourself) and maintainable, especially when managing multiple environments. **Terragrunt**, a lightweight Terraform wrapper, offers a variety of features to help you simplify this task.

One of Terragrunt's biggest advantages is its ability to centralize backend configuration. This means you can define your backend configuration in a single location and inherit it across all child modules. This eliminates the need to duplicate backend configuration in each module, making your code more streamlined and manageable.

In this blog post, we'll explore the basics of Terragrunt, its key features, and how it can significantly improve your Terraform workflows, making them more efficient, organized, and easier to maintain.

## 📑 Addressing Common Challenges with Terraform: The Terragrunt Approach

Terraform is a powerful infrastructure-as-code tool that allows users to define their infrastructure through code. However, it can be challenging to manage the Terraform state file and maintain **DRY** (Don't Repeat Yourself) code, especially in multi-environment deployments.

There are various solutions to these challenges, such as using [workspaces](https://www.terraform.io/docs/state/workspaces.html), [Terraform Cloud](https://www.hashicorp.com/products/terraform) (for a fee), or scripts with variables. However, **Terragrunt**, a wrapper for Terraform, offers a flexible and elegant solution.

## What is DRY and Why is it Important

[DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) stands for *Don't Repeat Yourself*. It is a software engineering principle that aims to reduce software complexity. Any piece of information that is duplicated is liable to get stale and cause problems and requires extra work to be kept updated, increasing the costs and difficulty of maintaining software.

In order to avoid paying the extra costs of maintaining duplicated information, we need abstractions that help us:

- Extract information, define it only once, and reuse it whenever possible.
- Provide an easy way to update and access the single representation of information and use it multiple times for different environments.


## 📂 Terragrunt Folder Structures

[Terragrunt](https://terragrunt.gruntwork.io/) allows you to select a Terraform code directory and populate variables with easy state management. Inputs for Terraform variables are defined in `.hcl` files that can reference each other and more.

This example will create an `AWS Instance` in `eu-west-1` and an `S3 bucket` deployed with [Terragrunt](https://terragrunt.gruntwork.io/docs/features/keep-your-terraform-code-dry/) for `development`, `production`, and `staging` environments.

You can follow along in your AWS account by cloning [this repo](https://github.com/seifrajhi/terragrunt-dry-demo).

```bash
# terragrunt-dry-demo
├── development
│   ├── instance
│   │   └── terragrunt.hcl
│   ├── s3
│   │   └── terragrunt.hcl
│   └── terragrunt.hcl
│       
├── production
│   ├── instance
│   │   └── terragrunt.hcl
│   ├── s3
│   │   └── terragrunt.hcl
│   └── terragrunt.hcl
│       
└── staging
    ├── instance
    │   └── terragrunt.hcl
    ├── s3
    │   └── terragrunt.hcl
    └── terragrunt.hcl
```

The root `terragrunt.hcl` file in each directory generates an AWS provider so you only need to specify this code once in the root location.

### 🗂️ Terragrunt Config File Structure

Terragrunt config contains blocks and attributes. Let's start with `{env_name}/terragrunt.hcl` file where `env_name` can be `development`, `staging`, or `production`.

It contains definitions for things every environment will use:

```hcl
locals {
  region         = "eu-west-1"
  bucket         = "example"
  key            = "terraform/${path_relative_to_include()}/terraform.tfstate"
  dynamodb_table = "terraform_locks"
  profile        = "my-aws-profile"
}

inputs = {}

remote_state {
  backend = "s3"
  config = {
    bucket         = local.bucket
    region         = local.region
    key            = local.key
    dynamodb_table = local.dynamodb_table
    profile        = local.profile
    encrypt        = true
  }
}
```
The `locals` block should be quite obvious — you can easily refer to them later in Terragrunt. The most important code line is:

```hcl
key = "terraform/${path_relative_to_include()}/terraform.tfstate"
```

This line ensures that the Terraform state file is stored in a consistent location across different environments.

This will ensure that the state will be saved to the path which includes the path in which `.hcl` lives. With that, you can quickly ensure that every environment state will be managed in a different state file.

Now to make sure this will be referenced in other Terragrunt files, you need to add this:

```hcl
# terragrunt-dry-demo/development/instance/terragrunt.hcl
terraform {
    source = "git::https://github.com/seifrajhi/terragrunt-dry-tutorial-modules.git//instance?ref=v1.0.0"
}
include {
    path = find_in_parent_folders()
}
inputs = {
     ami = "ami-046a9f26a7f14326b"
     instance_type = "t2.micro"
     availability_zone_names = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
     resource_tags = {
        Name = "instance-demo"
        Owner = "Saif Rajhi"
    }
}
```

Use the `include` block to add `*.hcl` file. Then use `terraform` to point to the directory with Terraform code using the relative path returned from the function `find_in_parent_folders()`.

To run `develop/terragrunt.hcl`, go to the directory and run:

```bash
terragrunt apply
```

State will be saved in the bucket as:

```hcl
terraform/${path_relative_to_include()}/terraform.tfstate
```

Each environment configuration is wrapped into a single `.hcl` file. Of course, if you want to keep states in different buckets, it is also possible. Just change the bucket name to use a function like the state key.

### 🚀 Terragrunt Commands

Most of the Terragrunt commands are wrappers around Terraform commands:

- `terragrunt plan` -> `terraform plan`
- `terragrunt apply` -> `terraform apply`

But some of them proceed with additional changes. For example, `terragrunt init` automatically creates a bucket or DynamoDB (if using AWS).

### 🛠️ Generating Terraform Code with Terragrunt

You can generate Terraform code to skip some manual work. Example use case: you want to generate an identical provider for each environment with the ability to change the AWS profile and region.

```hcl
# terragrunt-dry-demo/development/terragrunt.hcl
generate "provider" {
    path = "provider.tf"
    if_exists = "overwrite_terragrunt"
    contents = <<EOF
provider "aws" {
    profile = "default"
    region  = "eu-west-1"
}
EOF
}
```

The `instance` and `s3` sub-folders also contain a `terragrunt.hcl` file. This sets the `source` parameter to point at a specific Terragrunt module in the [terragrunt-cloudtruth-modules](https://github.com/seifrajhi/terragrunt-cloudtruth-modules) repo. They also include a function `find_in_parent_folders` which configures the AWS provider from the root `terragrunt.hcl`. As a result, you avoid copying the provider and Terraform code in multiple locations.

Terraform modules allow you to keep your HCL DRY by allowing you to reuse and break down infrastructure code into smaller pieces. Our structure contains a `main.tf`, `outputs.tf`, and `variables.tf`.

### 📍 Final Thoughts

Terraform is a great tool, but I could not imagine working with it now without Terragrunt. This article is only a quick introduction and does not dive deeply into more hidden features. And yes, Terragrunt supports working with modules.

Of course, Terraform has an official solution to multi-environment management — [Terraform Cloud](https://www.hashicorp.com/products/terraform). But if you are not convinced by enterprise solutions and costs, here comes Terragrunt.

Try it yourself. It could be a game-changer for you.

<br>

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
