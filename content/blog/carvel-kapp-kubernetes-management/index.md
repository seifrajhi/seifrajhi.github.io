---
id: dd463503af64ad55ec44bc0d
path: "/blog/carvel-kapp-kubernetes-management/"
date: "2024-10-25 18:06:00"
published: true
title: "Simplify Kubernetes Application Management with Carvel kapp"
cover: "./carvel-cover.png"
excerpt: "Discover how Carvel kapp simplifies Kubernetes application management, giving you control over your Kubernetes resources."
keywords:
  - Kubernetes
  - Carvel
  - kapp
  - Platform engineering
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Take control of your Kubernetes resources🔥**

## 📔 Introduction

Kubernetes applications involve juggling multiple resources, configurations, and dependencies. Carvel kapp offers a straightforward solution to this complexity. It treats related Kubernetes resources as logical "applications," allowing you to deploy, update, and manage them as cohesive units. With kapp, you can safely apply changes, preview diffs, and prune obsolete resources — all while minimizing disruptions to running workloads.

## kapp Overview

Carvel kapp is a lightweight, command-line tool that simplifies the deployment and management of Kubernetes applications. Unlike some other tools, kapp does not require any server-side components, elevated privileges, or custom resources, making it highly portable and easy to use, even in RBAC-constrained clusters.

At its core, kapp is designed to be explicit, providing visibility into the changes it will apply to your cluster before executing them. It calculates the differences between your desired configuration and the live cluster state, presenting a clear set of create, update, and delete operations for your approval.

One of kapp's standout features is its dependency-aware resource ordering. It intelligently manages the deployment order of certain resources, ensuring that dependencies are respected. For instance, Custom Resource Definitions (CRDs) and Namespaces are installed before the resources that depend on them. Additionally, kapp allows you to declare your own dependency rules, such as requiring a Job to complete database migrations before updating a Deployment.

## Deploy Kubernetes Applications with kapp

Before getting too deep, let's get some basic preparations out of the way:

1. **Create a Kubernetes cluster.**
2. **Install [ytt](https://carvel.dev/ytt/), [kbld](https://carvel.dev/kbld/), [kapp](https://carvel.dev/kapp/)** by following instructions in the [Install section on carvel.dev](https://carvel.dev/#install).

To get started with our example application, clone [kapp-k8s-demo](https://github.com/seifrajhi/kapp-k8s-demo.git) locally:

```shell
git clone https://github.com/seifrajhi/kapp-k8s-demo.git
cd kapp-k8s-demo
```

This directory contains a simple Go application that consists of main.go (an HTTP web server) and a Dockerfile .
Multiple step-* directories contain variations of application configuration that we will use in each step.

```shell
$ ls -l
Dockerfile
main.go
config-minimal
```

Typically, an application deployed to Kubernetes will include **Deployment** and **Service** resources in its configuration. In our example, `config-minimal/` directory contains `config.yml` which includes exactly that. (Note that the Docker image is already preset and the environment variable `HELLO_MSG` is hard coded. We'll get to those shortly.)

Traditionally, you can use `kubectl apply -f config-minimal/config.yml` to deploy this application. However, `kubectl` does not indicate which resources are affected and how they are affected before applying changes, and does not yet have a robust prune functionality to converge a set of resources.

**kapp** addresses and improves on several `kubectl` limitations as it was designed from the start around the notion of a "Kubernetes Application" — a set of resources with the same label:

- **Visibility and Confidence**: `kapp` separates the change calculation phase (diff) from the change apply phase (apply) to give users visibility and confidence regarding what's about to change in the cluster.
- **Resource Tracking**: `kapp` tracks and converges resources based on a unique generated label, freeing its users from worrying about cleaning up old deleted resources as the application is updated.
- **Order Management**: `kapp` orders certain resources so that the Kubernetes API server can successfully process them (e.g., CRDs and namespaces before other resources).
- **Readiness Wait**: `kapp` tries to wait for resources to become ready before considering the deploy a success.

For more information, you can visit the [Carvel kapp documentation](https://carvel.dev/kapp/docs/latest/).

Let us deploy our application with kapp:

```shell
$ kapp deploy -a simple-app -f step-1-minimal/
Target cluster ['https://192.168.99.111:8443'](https://192.168.99.111:8443) (nodes: minikube)
Changes
Namespace  Name        Kind        Conds.  Age  Op      Op st.  Wait to    Rs  Ri
default    simple-app  Deployment  -       -    create  -       reconcile  -   -
^          simple-app  Service     -       -    create  -       reconcile  -   -
Op:      2 create, 0 delete, 0 update, 0 noop
Wait to: 2 reconcile, 0 delete, 0 noop
Continue? [yN]: y
8:17:44PM: ---- applying 2 changes [0/2 done] ----
8:17:44PM: create deployment/simple-app (apps/v1) namespace: default
8:17:44PM: create service/simple-app (v1) namespace: default
8:17:44PM: ---- waiting on 2 changes [0/2 done] ----
8:17:45PM: ok: reconcile service/simple-app (v1) namespace: default
8:17:45PM: ongoing: reconcile deployment/simple-app (apps/v1) namespace: default
8:17:45PM:  ^ Waiting for generation 2 to be observed
8:17:45PM:    ok: waiting on replicaset/simple-app-7fbc6b7c9b (apps/v1) namespace: default
8:17:45PM:    ongoing: waiting on pod/simple-app-7fbc6b7c9b-g92t7 (v1) namespace: default
8:17:45PM:     ^ Pending: ContainerCreating
8:17:45PM: ---- waiting on 1 changes [1/2 done] ----
8:17:45PM: ongoing: reconcile deployment/simple-app (apps/v1) namespace: default
8:17:45PM:  ^ Waiting for 1 unavailable replicas
8:17:45PM:    ok: waiting on replicaset/simple-app-7fbc6b7c9b (apps/v1) namespace: default
8:17:45PM:    ongoing: waiting on pod/simple-app-7fbc6b7c9b-g92t7 (v1) namespace: default
8:17:45PM:     ^ Pending: ContainerCreating
8:17:49PM: ok: reconcile deployment/simple-app (apps/v1) namespace: default
8:17:49PM: ---- applying complete [2/2 done] ----
8:17:49PM: ---- waiting complete [2/2 done] ----
Succeeded
```

Our simple-app received a unique label kapp.k14s.io/app=1557433075084066000 for resource tracking:

```shell
$ kapp ls
Target cluster ['https://192.168.99.111:8443'](https://192.168.99.111:8443) (nodes: minikube)
Apps in namespace 'default'
Name        Namespaces  Lcs   Lca
simple-app  default     true  23s
1 apps
Succeeded
```

Using this label, kapp tracks and allows inspection of all Kubernetes resources created for sample-app:

```shell
$ kapp inspect -a simple-app --tree
Target cluster 'https://192.168.99.111:8443' (nodes: minikube)
Resources in app 'simple-app'
Namespace  Name                              Kind        Owner    Conds.  Rs  Ri  Age
default    simple-app                        Deployment  kapp     2/2 t   ok  -   46s
default       simple-app-7fbc6b7c9b          ReplicaSet  cluster  -       ok  -   46s
default         simple-app-7fbc6b7c9b-g92t7  Pod         cluster  4/4 t   ok  -   46s
default    simple-app                        Service     kapp     -       ok  -   46s
default       simple-app                     Endpoints   cluster  -       ok  -   46s
Rs: Reconcile state
Ri: Reconcile information
5 resources
Succeeded
```

Note that it even knows about resources it did not directly create (such as ReplicaSet and Endpoints).

```shell
$ kapp logs -f -a simple-app
Target cluster 'https://192.168.99.111:8443' (nodes: minikube)
# starting tailing 'simple-app-7fbc6b7c9b-g92t7 > simple-app' logs
simple-app-7fbc6b7c9b-g92t7 > simple-app | 2020/12/14 01:17:48 Server started
```

inspect and logs commands demonstrate why it's convenient to view resources in "bulk" (via a label). For example, logs command will tail any existing or new Pod that is part of simple-app application, even after we make changes and redeploy.

### Deploying configuration changes

Let's make a change to the application configuration to simulate a common occurrence in a development workflow. A simple observable change we can make is to change the value of the HELLO_MSG environment variable in [config-step-1-minimal/config.yml](https://github.com/carvel-dev/simple-app-on-kubernetes/blob/develop/config-step-1-minimal/config.yml):

![alt text](change.png)

and **re-run kapp deploy command**.

The output should highlight several kapp features:

kapp detected a single change to simple-app Deployment by comparing given local configuration against the live cluster copy

kapp showed changes in a git-style diff via `--diff-changes` flag

since simple-app Service was not changed in any way, it was not "touched" during the apply changes phase at all

kapp waited for Pods associated with a Deployment to converge to their ready state before exiting successfully

To double check that our change applied, go ahead and refresh your browser window with our deployed application.

Given that kapp does not care where application configuration comes from, one can use it with any other tools that produce Kubernetes configuration, for example, Helm's template command:

```shell
helm template my-chart --values values.yml | kapp deploy -a my-app -f- --yes
```

**_Until next time, つづく 🎉_**

<br><br>

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time, つづく 🇵🇸🎉_**

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
