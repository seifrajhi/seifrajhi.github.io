---
id: cd1b36776850115800db9c16
path: "/blog/eks-access-entry-terraform-opentofu/"
date: "2024-10-02 13:34:00"
published: true
title: "Managing AWS EKS access entries with Terraform and OpenTofu"
cover: "./image.png"
excerpt: "EKS Access Entries, Terraform, OpenTofu, Kubernetes, Authentication"
keywords:
  - EKS Access Entries
  - Kubernetes
  - Terraform
  - OpenTofu
  - Authentication
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Setting up EKS authentication and authorization using Infrastructure as Code**

## 📚 Introduction

Managing who can access your AWS EKS clusters can be tricky, especially in big companies. Usually, the person who creates the EKS cluster has full control. But this can be a problem for security and management. AWS EKS has new controls called access entries to help manage who can access your Kubernetes clusters more easily.

In this blog, we will show you how to use Terraform and OpenTofu to set up access entries for your AWS EKS clusters. We will explain what access entries are, the different options you can use, and how this new method makes it easier to manage who can access your clusters.

## The Need for EKS access entries

Traditionally, we used a special `aws-auth` ConfigMap to define the IAM roles for worker nodes, users, roles, and groups. This method required manual updates and was prone to errors, making it difficult to manage access at scale.

With the introduction of Access Entries, AWS has provided a more streamlined and efficient way to manage access to EKS clusters. Now, we can manage access directly through the [EKS API](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/eks/index.html) using AWS IAM as an authenticator. This means that when a user logs in to AWS, AWS handles the authentication, verifying the user's identity. When the user connects to Kubernetes, Kubernetes handles the authorization, checking the user's permissions within the cluster.

This new approach integrates seamlessly with Kubernetes' RBAC (Role-Based Access Control), providing a more robust and flexible access management system. One significant improvement is the ability to remove the "default root user" – the hidden cluster administrator created by default. Previously, this user could not be seen or changed, which sometimes caused issues.

By moving access control to dedicated Terraform code, we can manage access more easily and with less risk. In the old system, there was a chance you would lose cluster access if you deleted the cluster owner. Now, other users can add IAM principals to access the cluster through APIs, making it easier to manage access with Infrastructure as Code (IaC) tools like OpenTofu, Terraform, Pulumi, Ansible, and CloudFormation.

Access Entries also provide predefined access policies that can be assigned to IAM principals outside the cluster through EKS APIs. This allows users to access cluster resources without needing to define RBAC resources inside the Kubernetes cluster, simplifying the management process and enhancing security.

---

