---
id: c7e60ef3d7a8a8d7e6ebda4a
path: "/blog/sops-secrets-safe-in-git/"
date: "2024-10-19 18:06:00"
published: true
title: "The SOPS way: The only way to keep your secrets safe in Git"
cover: "./sops-cover.jpg"
excerpt: "How to use SOPS to securely manage your secrets in Git. This guide provides a foolproof method to ensure your sensitive information remains protected."
keywords:
  - SOPS
  - Git
  - Secret Management
  - Cloud Security
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **SOPS: A foolproof way to keep your secrets safe 🔥**

## 📚 Introduction

Secrets are a fact of life in the world of DevOps. We use them to access servers, databases, and other sensitive resources. But storing secrets in plain text is a security risk. If your secrets are compromised, an attacker could gain access to your systems and data.

SOPS is a tool that helps you store your secrets securely in Git. It encrypts your secrets using a key that is stored in a separate file. This way, your secrets are never stored in plain text, even in your Git repository.

In this blog post, I will show you how to use SOPS to keep your secrets safe.

![Alt text](./sops.jpg)

## 🏛️ Traditional Secret Storage

Traditionally, secrets are stored in a separate, secure location, such as [Hashicorp Vault](https://www.vaultproject.io/), [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html), [GCP KMS](https://cloud.google.com/security-key-management), [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/basic-concepts), and well-known credential storages like [1Password](https://1password.com/). This has the advantage of isolating the secrets from the code that references them. However, it also introduces an extra step: the code must fetch the secret value from the vault or credential manager before it can use it. This can be a security risk, as it exposes the secret value to the code for a brief period of time.

## 🔐 SOPS

[SOPS](https://github.com/getsops/sops) offers a simplified version of secret storage. With SOPS, the secret values are directly stored in the code, and they are encrypted using a key that is stored in a separate file. This way, the secret values are never stored in plain text, even in the code. To decrypt the secret values, the code must use the key file. This eliminates the need to fetch the secret values from a vault or credential manager, which reduces the security risk.

SOPS supports a variety of encryption methods, including AWS KMS, PGP, GCP KMS, Azure Key Vault, HashiCorp Key Vault, and [age](https://github.com/FiloSottile/age). This makes it a flexible and versatile tool that can be used to store secrets in a variety of environments.

## 🛠️ A Step-by-Step Guide to Using SOPS

In this section, we will deploy a sample chart to a Kubernetes cluster using [Helm](https://helm.sh/) (Helmfile) and AWS KMS.

### 📦 Helm (Helmfile)

[Helm](https://helm.sh/) is a package manager for Kubernetes. It allows you to deploy and manage Kubernetes applications. [Helmfile](https://github.com/helmfile/helmfile) is a tool that helps you manage Helm charts.

### 🔐 SOPS

[SOPS](https://github.com/getsops/sops) is a tool that helps you encrypt and decrypt secrets using a variety of encryption methods, including AWS KMS.

### 🔑 AWS KMS Key

[AWS KMS](https://aws.amazon.com/kms/) is a key management service that allows you to create and manage encryption keys. You can use AWS KMS to encrypt secrets that you want to store in your Kubernetes cluster.

Here are the reference code and a few Terraform templates to create KMS and IAM resources. I also added a walkthrough for Terraform [here](https://github.com/seifrajhi/sops-secrets-blog).

### 🚀 Deployment Steps

To deploy the sample httpbin app in your Kubernetes cluster, you can use the following steps:

1. **Clone the repository:**

    ```shell
    git clone https://github.com/seifrajhi/sops-secrets-blog
    ```

2. **Change the directory to the helmfile directory:**

    ```shell
    cd sops-secrets-blog/helmfile/
    ```

3. **Deploy the httpbin app using Helmfile:**

    ```shell
    helmfile -e sops-poc apply
    ```

    This will deploy the httpbin app in your Kubernetes environment, including a pod, a service, a service account, and a secret.

4. **Examine the environment variables in the newly created pod:**

    ```shell
    kubectl get pods -o wide
    ```

    This will show you the environment variables that are set for the pod, including the `FIRST_VAR` and `SECOND_VAR` variables. We will use this information in a later step.

## 🔑 The Real Deal: Managing Secrets with Helmfile

Now, let's talk about secrets. Helmfile supports secrets by using the `helm-secrets` plugin. This plugin allows you to manage and inject sensitive information into a given release's values.

However, there is a caveat: the secret values will be shown in plain text in the `helmfile diff` or `helmfile apply` outputs. This is not ideal, as it could expose sensitive information to unauthorized users.

Fortunately, there is a workaround for this. You can use the `helm-secrets` plugin to encrypt your secrets before storing them in Helmfile. This plugin will decrypt the secrets when Helmfile deploys the release, but the secret values will not be shown in plain text in the `helmfile diff` or `helmfile apply` outputs.

To learn more about how to use the `helm-secrets` plugin, please refer to the [helm-secrets GitHub repository](https://github.com/jkroepke/helm-secrets).

### 📥 Installing `helm-secrets`

To use the `helm-secrets` plugin, you will need to install it first. You can do this by running the following command:

```shell
helm plugin install https://github.com/jkroepke/helm-secrets
```

This will install the `helm-secrets` plugin in your local Helm installation. Once the plugin is installed, you can use it to encrypt and decrypt secrets in your Helmfile manifests.

### 🔐 Installing SOPS

To install SOPS, you can use the following command:

```shell
brew install sops
```

Once SOPS is installed, you can use it to encrypt and decrypt files.

### 🛠️ Configuring SOPS

To use SOPS, you need to create a `.sops.yaml` configuration file. This file tells SOPS what files to encrypt and how to encrypt them. The following is an example of a `.sops.yaml` configuration file:

```yaml
creation_rules:
    - path_regex: \.yaml$
        kms: 'arn:of:your:kms:key'
```

This configuration file tells SOPS to encrypt any file that ends in `.yaml` using the KMS key with the ARN `arn:of:your:kms:key`.

You can create the `.sops.yaml` file anywhere in your filesystem. SOPS will look for it in the current directory by default, but you can also specify the path to the file using the `-c` flag.

### 🔏 Creating and Encrypting Secrets

To create the `secrets.yaml` file, you can use the following command:

```shell
sops secrets.yaml
```

This will open a text editor with prefilled sample values. Replace the content with the following:

```yaml
my_var: a top secret value
my_other_var: not that sensitive, but still please don't tell anyone!
```

When you save and close the file, SOPS will encrypt it automatically. You can then open the file and have a look at its content. SOPS will have added metadata to the file, including the KMS ARN that was used to encrypt the file, a timestamp, and some other information.

### 📄 Adding Secrets to Helmfile

Now, it's time to add the secrets to the Helmfile manifest. To do this, you need to add a `secrets:` section to the release in the `helmfile.yaml` file. The following is an example of how to do this:

```yaml
bases:
- environments.yaml

releases:
- name: example-release
    namespace: example-ns
    labels:
        app: example
    values:
    - values.yaml.gotmpl
    secrets:
    - secrets.yaml
    chart: ./charts/httpbin
```

As a result of adding the `secrets:` section to the release in the `helmfile.yaml` file, Helmfile will merge the `values.yaml` and `secrets.yaml` files as one and then use it to populate the templates in the `charts/httpbin/templates/` directory when deploying the release.

### 📝 Modifying Deployment Template

To make use of the new secrets, you need to modify the deployment template in the `charts/httpbin/templates/deployment.yaml` file. The following is an example of how to do this:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: {{ .Values.name }}
spec:
    replicas: {{ .Values.replicas }}
    selector:
        matchLabels:
            app: {{ .Values.name }}
            version: v1
    template:
        metadata:
            labels:
                app: {{ .Values.name }}
                version: v1
        spec:
            serviceAccountName: {{ .Values.name }}
            containers:
            - image: docker.io/kong/httpbin
                imagePullPolicy: IfNotPresent
                name: {{ .Values.name }}
                ports:
                - containerPort: 80
                env:
                - name: FIRST_VAR
                    value: {{ .Values.my_var }}
                - name: SECOND_VAR
                    value: {{ .Values.my_other_var }}
```

### 🔍 Verifying Changes

If we check what Helmfile does, you can run the below command:

```shell
helmfile -e sops-poc diff
```

Now the values are effectively taken from a Kubernetes secret instead of directly from secrets defined in the Helmfile release.

Go ahead and run `helmfile -e sops-poc apply` to deploy the changes.

### 🔄 Updating Secrets

Let's now modify `secrets.yaml` values:

```shell
sops secrets.yaml
```

I removed random characters from both `my_var` and `my_other_var` in `secrets.yaml`, it doesn't really matter the change, it is just an example. Save and close the file to have SOPS re-encrypt it.

And now if you see what Helmfile tries to do, you will find that there are no secrets shown in plain text anymore! 🎉

## 🔏 Conclusion

In this blog post, we discussed SOPS, a tool that can be used to encrypt and decrypt secrets in Git. We also discussed the benefits of using SOPS, and how it can help to keep your secrets safe.

SOPS is a powerful tool that can be used to encrypt a wide variety of secrets, including passwords, API keys, and SSH keys. SOPS uses a variety of encryption methods, including AES-256, RSA-2048, and Ed25519. This makes it very difficult for attackers to decrypt SOPS-encrypted secrets.

SOPS also supports a variety of key management options, including KMS, HashiCorp Vault, and AWS Secrets Manager. This makes it easy to store and manage your SOPS keys in a secure manner.

By using SOPS, you can be sure that your secrets are safe in Git. SOPS is a foolproof way to keep your secrets safe.

<br>

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  _**Until next time 🎉**_

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
