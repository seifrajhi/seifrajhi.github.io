---
id: a9715a4a47f18401bfc09825
path: "/blog/vault-agent-secrets-injector/"
date: "2024-10-23 22:36:00"
published: true
title: "Securely Inject Secrets to Pods with the Vault Agent Injector"
cover: "./vault-injector.jpg"
excerpt: "Discover how the Vault Agent Injector can securely inject secrets into your Kubernetes pods, enhancing the security of your Kubernetes secrets management."
keywords:
  - Kubernetes
  - secrets
  - Vault Agent Injector
  - security
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **A Must-Have Tool for Securing Your Kubernetes Secrets**

## ⭐️ Introduction

In today's tech-driven world, keeping data secure is a big deal. Kubernetes helps manage software in containers, but it can have security limits, especially for sensitive info. To fix this, we can connect Kubernetes with [Vault](https://www.vaultproject.io/), a tool that stores secrets safely.

Vault Agent does the job here, so your apps don't need to know about Vault. But to make this work, you need to set up Vault Agent with your apps.

The Vault Helm chart makes it easy. It lets you run Vault and Vault Agent Sidecar Injector, which helps manage secrets for your apps.

This is great because:
- ✔️ Apps don't have to worry about Vault; secrets are stored in their container.
- ✔️ You don't have to change your existing setups; just add some annotations.
- ✔️ You can control who gets access to secrets using Kubernetes.

In this tutorial, we'll set up Vault and the injector service with the Vault Helm chart. Then, we'll deploy some apps to show how the injector service handles secrets.

![vault](./vault.png)

## 📕 Prerequisites

Before you begin, make sure you have the following tools installed:
- 🐳 Docker
- ☸️ Kubernetes command-line interface (CLI)
- 🎛️ Helm CLI
- 🖥️ Minikube

### 🏞 Clone GitHub repositories

To get the web application and additional configuration, clone the `seifrajhi/vault-k8s-sidecar-injector` repository from GitHub using the following commands:

```sh
git clone https://github.com/seifrajhi/vault-k8s-sidecar-injector.git
```

After cloning, navigate to the cloned repository:

```sh
cd vault-k8s-sidecar-injector
```

This will take you to the repository directory.

```sh
🐳  Preparing Kubernetes v1.26.3 on Docker 23.0.2 ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

Minikube provides a visual representation of the status in a web-based dashboard. This interface displays the cluster activity in a visual interface that can assist in delving into the issues affecting it.

In another terminal, launch the minikube dashboard:

```sh
minikube dashboard
```

The default browser opens and displays the dashboard.

![dashboard](./dashboard.png)

## 🏗 Deploy Vault inside the cluster

Deploying the Vault Helm chart is the preferred method for running Vault on Kubernetes. Helm, acting as a package manager, simplifies the installation and configuration of all essential components required for Vault's operation in various modes. Helm charts come equipped with templates that facilitate conditional and customizable execution. You can specify these parameters either through command-line inputs or by defining them in YAML files.

Add the HashiCorp Helm repository:

```sh
helm repo add hashicorp https://helm.releases.hashicorp.com
```

```sh
"hashicorp" has been added to your repositories
```

Update all the repositories to ensure helm is aware of the latest versions:

```sh
helm repo update
```

```sh
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "hashicorp" chart repository
Update Complete. ⎈Happy Helming!⎈
```

Install the latest version of the Vault server running in development mode:

```sh
helm install vault hashicorp/vault --set "server.dev.enabled=true"
```

The Vault pod and Vault Agent Injector pod are deployed in the default namespace. Display all the pods in the default namespace:

```sh
kubectl get pods
```

```sh
NAME                                    READY   STATUS    RESTARTS   AGE
vault-0                                 1/1     Running   0          2m
vault-agent-injector-4991fb98b5-tpgof   1/1     Running   0          2m
```

The `vault-0` pod runs a Vault server in development mode. The `vault-agent-injector` pod performs the injection based on the annotations present or patched on a deployment.

Running a Vault server in development is automatically initialized and unsealed. This is ideal in a learning environment but NOT recommended for a production environment.


## 👮 Create Vault Secrets & Policy

To demonstrate the Vault Agent Injector functionality, we will create the following:

- A set of secrets using the Vault KV engine.
- A Vault policy to read the secrets.
- Enable Vault Kubernetes authentication.
- Create a Vault role to bind the Vault policy and Kubernetes service account (`vault-auth`).
- Create a `vault-auth` Kubernetes service account to be used for Vault server authentication.

### 🗝️ Establishing a Secret in Vault

It's essential for the applications deployed in the next section to have Vault store a username and password at the designated location, namely `internal/database/config`. This process involves enabling a [key-value](https://developer.hashicorp.com/vault/docs/secrets/kv/kv-v2) secret engine and populating the specified path with the necessary username and password.

1. **Exec into the Vault pod:**

    ```sh
    kubectl exec -it vault-0 -- /bin/sh
    ```

    Your system prompt is replaced with a new prompt (`/ $`). Commands issued at this prompt are executed on the `vault-0` container.

2. **Enable the Vault KV engine (key-value store) at the path `internal`:**

    ```sh
    vault secrets enable -path=internal kv-v2
    ```

    ```sh
    Success! Enabled the kv-v2 secrets engine at: internal/
    ```

3. **Create a secret at the path `internal/database/config` with a username and password:**

    ```sh
    vault kv put internal/database/config username="db-readonly-username" password="db-secret-password"
    ```

    ```sh
    Key              Value
    ---              -----
    created_time     2023-09-04T09:55:01.111711644Z
    deletion_time    n/a
    destroyed        false
    version          1
    ```

4. **Verify that the secret is defined at the path `internal/database/config`:**

    ```sh
    vault kv get internal/database/config
    ```

    ```sh
    ====== Metadata ======
    Key              Value
    ---              -----
    created_time     2023-09-04T09:55:01.111711644Z
    deletion_time    n/a
    destroyed        false
    version          1

    ====== Data ======
    Key         Value
    ---         -----
    password    db-secret-password
    username    db-readonly-username
    ```

### 🔑 Enable Kubernetes Authentication

Vault provides a [Kubernetes authentication](https://developer.hashicorp.com/vault/docs/auth/kubernetes) method that enables clients to authenticate with a Kubernetes Service Account Token. This token is provided to each pod when it is created.

1. **Exec into the Vault pod:**

    ```sh
    kubectl exec -it vault-0 -- /bin/sh
    ```

2. **Enable Kubernetes authentication:**

    ```sh
    vault auth enable kubernetes
    ```

    ```sh
    Success! Enabled kubernetes auth method at: kubernetes/
    ```

3. **Configure the Kubernetes authentication method to use the location of the Kubernetes API:**

    ```sh
    vault write auth/kubernetes/config \
        token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
        kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443" \
        kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    ```

4. **Write out the policy named `internal-app` that enables the read capability for secrets at path `internal/data/database/config`:**

    ```sh
    vault policy write internal-app - <<EOF
    path "internal/data/database/config" {
       capabilities = ["read"]
    }
    EOF
    ```

5. **Create a Vault role named `internal-app` that binds `internal-app` and `internal-app` Kubernetes service account:**

    ```sh
    vault write auth/kubernetes/role/internal-app \
          bound_service_account_names=internal-app \
          bound_service_account_namespaces=default \
          policies=internal-app \
          ttl=24h
    ```

### 🆔 Define a Kubernetes Service Account

The Vault Kubernetes authentication role defined a Kubernetes service account named `internal-app`. A service account provides an identity for processes that run in a Pod. With this identity, we will be able to run the application within the cluster.

1. **Create a Kubernetes service account named `internal-app` in the default namespace:**

    ```sh
    kubectl create sa internal-app
    ```

2. **Apply the deployment defined in `deployment-orgchart.yaml`:**

    ```sh
    kubectl apply -f deployment-orgchart.yaml
    ```

    ```sh
    deployment.apps/orgchart created
    ```

3. **Get all the pods in the default namespace and note down the name of the pod with a name prefixed with `orgchart-`:**

    ```sh
    kubectl get pods
    ```

    ```sh
    NAME                                    READY   STATUS    RESTARTS   AGE
    orgchart-69697d9598-l878s               1/1     Running   0          30s
    vault-0                                 1/1     Running   0          45m
    vault-agent-injector-4991fb98b5-tpgof   1/1     Running   0          45m
    ```

4. **Verify that no secrets are written to the `orgchart` container in the `orgchart` pod:**

    ```sh
    kubectl exec $(kubectl get pod -l app=orgchart -o jsonpath="{.items[0].metadata.name}") \
    --container orgchart -- ls /vault/secrets
    ```

    ```sh
    ls: /vault/secrets: No such file or directory
    command terminated with exit code 1
    ```

### 🔐 Injecting Secrets into Pods

In this process, the deployment operates the pod using the `internal-app` Kubernetes service account within the default namespace. The Vault Agent Injector exclusively makes adjustments to a deployment when specific annotations are present. If an existing deployment lacks these annotations, its definition can be patched to include them.

```yaml
spec:
   template:
      metadata:
      annotations:
         vault.hashicorp.com/agent-inject: 'true'
         vault.hashicorp.com/role: 'internal-app'
         vault.hashicorp.com/agent-inject-secret-database-config.txt: 'internal/data/database/config'
```

[These annotations](https://developer.hashicorp.com/vault/docs/platform/k8s/injector/annotations) define a partial structure of the deployment schema and are prefixed with `vault.hashicorp.com`.

- [agent-inject](https://developer.hashicorp.com/vault/tutorials/kubernetes/kubernetes-sidecar#agent-inject) enables the Vault Agent Injector service.
- [role](https://developer.hashicorp.com/vault/tutorials/kubernetes/kubernetes-sidecar#role) is the Vault Kubernetes authentication role.
- [agent-inject-secret-FILEPATH](https://developer.hashicorp.com/vault/tutorials/kubernetes/kubernetes-sidecar#agent-inject-secret-filepath) prefixes the path of the file, `database-config.txt` written to the `/vault/secrets` directory. The value is the path to the secret defined in Vault.

1. **Patch the `orgchart` deployment defined in `patch-inject-secrets.yaml`:**

    ```sh
    kubectl patch deployment orgchart --patch "$(cat patch-inject-secrets.yaml)"
    ```

    ```sh
    deployment.apps/orgchart patched
    ```

    A new `orgchart` pod starts alongside the existing pod. When it is ready, the original terminates and removes itself from the list of active pods.

2. **Wait until the re-deployed `orgchart` pod reports that it is Running and ready (2/2).**

    This new pod now launches two containers: the application container, named `orgchart`, and the Vault Agent container, named `vault-agent`.

3. **Display the logs of the `vault-agent` container in the new `orgchart` pod:**

    ```sh
    kubectl logs $(kubectl get pod -l app=orgchart -o jsonpath="{.items[0].metadata.name}") \
    --container vault-agent
    ```

    Vault Agent manages the token lifecycle and the secret retrieval. The secret is rendered in the `orgchart` container at the path `/vault/secrets/database-config.txt`.

4. **Display the secret written to the `orgchart` container:**

    ```sh
    kubectl exec $(kubectl get pod -l app=orgchart -o jsonpath="{.items[0].metadata.name}") \
    --container orgchart -- cat /vault/secrets/database-config.txt
    ```

### 🔒 Vault Agent Template Example

You can use Vault templates to render secrets in required formats. In this example, we will see how to use templates in deployment annotation.

To apply this template, a new set of annotations need to be applied.

```yaml
spec:
   template:
      metadata:
      annotations:
         vault.hashicorp.com/agent-inject: 'true'
         vault.hashicorp.com/agent-inject-status: 'update'
         vault.hashicorp.com/role: 'internal-app'
         vault.hashicorp.com/agent-inject-secret-database-config.txt: 'internal/data/database/config'
         vault.hashicorp.com/agent-inject-template-database-config.txt: |
            {{- with secret "internal/data/database/config" -}}
            postgresql://{{ .Data.data.username }}:{{ .Data.data.password }}@postgres:5432/wizard
            {{- end -}}
```

This patch contains two new annotations:

- [agent-inject-status](https://developer.hashicorp.com/vault/tutorials/kubernetes/kubernetes-sidecar#agent-inject-status) set to `update` informs the injector to reinject these values.
- [agent-inject-template-FILEPATH](https://developer.hashicorp.com/vault/tutorials/kubernetes/kubernetes-sidecar#agent-inject-template-filepath) prefixes the file path. The value defines the Vault Agent template to apply to the secret's data.

The template formats the username and password as a PostgreSQL connection string.

1. **Apply the updated annotations:**

    ```sh
    kubectl patch deployment orgchart --patch "$(cat patch-inject-secrets-as-template.yaml)"
    ```

    ```sh
    deployment.apps/exampleapp patched
    ```

2. **Wait until the re-deployed `orgchart` pod reports that it is [Running and ready](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-phase) (2/2).**

3. **Finally, display the secret written to the `orgchart` container in the `orgchart` pod:**

    ```sh
    kubectl exec $(kubectl get pod -l app=orgchart -o jsonpath="{.items[0].metadata.name}") \
    -c orgchart -- cat /vault/secrets/database-config.txt
    ```

    The secrets are rendered in a PostgreSQL connection string present on the container:

    ```sh
    postgresql://db-readonly-user:db-secret-password@postgres:5432/wizard
    ```

### 🔚 Conclusion

Incorporating Kubernetes alongside Vault for secret management, the use of a Vault injector offers a seamless approach to integrating secrets into pods. This approach eliminates the need for applications to directly interact with the secret management system; they simply retrieve secrets from a predefined file path.

Furthermore, it's vital to ensure high availability of the production Vault server. An unavailable Vault server could potentially lead to application disruptions, particularly during activities such as pod restarts or scaling operations.

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
