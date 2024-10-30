---
id: 384464547971f7b27e444dd3
path: "/blog/kubelet-authorization-kubernetes-security/"
date: "2024-10-30 19:30:00"
published: true
title: "Kubernetes Node Security: The Role of Kubelet Authorization 🔐"
cover: "./kubelet-authorization-cover.jpg"
excerpt: "Understand the critical role of Kubelet authorization in securing Kubernetes nodes, a must-know for Kubernetes admins."
keywords:
  - Kubernetes
  - Kubelet
  - Authorization
  - Node Security
  - DevOps
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Kubelet Authorization: A Must-Know for Kubernetes Admins 🔐**

## ⭐️ Introduction

Kubernetes, the cornerstone of modern container orchestration, relies on various components to ensure the efficient management of container workloads. Among these components, the Kubelet plays a vital role in overseeing worker nodes within the Kubernetes cluster. It manages container runtimes and communicates with the Kubernetes API server, ensuring that containers are correctly created and managed on individual nodes.

If an attacker breaks out from a container to the host node, they often gain access to a set of kubelet credentials. These credentials could then potentially be exploited to elevate their privileges within the cluster. Consequently, the Kubernetes project has implemented measures to limit the actions that the Kubelet can perform to reduce the risk of privilege escalation.

## 🥅 Objectives of the Blog

In this blog post, we'll explore a critical aspect of Kubernetes security: **Kubelet Authorization**. For Kubernetes administrators, understanding the importance of Kubelet credentials from a security perspective is essential. Our goal here is to highlight the significance of these credentials, their security implications, and the measures put in place by the Kubernetes project to minimize potential risks.

## 💱 Exploring Kubernetes Authorization Modes

Before discussing the specifics of Kubelet authorization, it's crucial to understand how Kubernetes handles authorization on a broader scale. Kubernetes provides multiple authorization modes, allowing cluster administrators to tailor access control to their specific needs.

The most commonly used authorization mode is [Role-Based Access Control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/), which allows administrators to define fine-grained permissions for users and service accounts. However, Kubernetes also supports other authorization modes, such as [Node Authorizer](https://kubernetes.io/docs/reference/access-authn-authz/node/), [Webhook](https://kubernetes.io/docs/reference/access-authn-authz/webhook/), and [Attribute-Based Access Control (ABAC)](https://kubernetes.io/docs/reference/access-authn-authz/abac/), each serving distinct use cases.

It's essential to recognize that in Kubernetes, rights provided by each authorization mode are cumulative. This means that a user's permissions result from the combined effects of all active authorization modes. Therefore, careful consideration is necessary to avoid inadvertently granting excessive privileges to users.

Kubernetes provides a built-in tool for enumerating a user's permissions using the `kubectl auth can-i --list` command. However, it's important to note that this tool is optimized for RBAC. Permissions granted through other authorization modes, such as Node Authorizer or Webhook, will not be included in the analysis. To assess individual permissions granted via any authorization mode, you can use the `kubectl auth can-i` command.

This nuanced approach ensures a comprehensive evaluation of user rights, regardless of the chosen authorization mode within your Kubernetes cluster. Understanding and effectively managing these authorization modes is fundamental to maintaining a secure and well-controlled Kubernetes environment.

## 🗺 Understanding Kubelet Authorization

Now that we have covered the essential concepts, let's delve into the mechanics of Kubelet authorization. We will initiate our exploration with a Kubernetes in Docker ([KinD](https://kind.sigs.k8s.io/)) cluster, examining the observable aspects within this context.

To facilitate this exploration, we will set up a cluster comprising two worker nodes. We'll configure this cluster using a straightforward KinD configuration, as demonstrated below:

```yaml
# Configuration for a three-node (two workers) cluster
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
    - role: control-plane
    - role: worker
    - role: worker
```

This KinD cluster configuration serves as our starting point for understanding how Kubelet authorization functions within the Kubernetes ecosystem.

After configuring the KinD cluster as outlined above, we can proceed to start it up using the following command:

```sh
kind create cluster --config kind-config.yaml --name kubeletauthz
```

Once the cluster is successfully launched and operational, we can access one of the worker nodes to examine the Kubelet credentials. To determine the Kubeconfig file used by the Kubelet, inspect the command line parameters. In many cases, including Kubeadm setups, the default path for the Kubeconfig file is specified as `--kubeconfig=/etc/kubernetes/kubelet.conf`.

Armed with this information, you can utilize `kubectl` to access cluster resources. For example, you can retrieve a list of pods within the cluster by running:

```sh
kubectl --kubeconfig=/etc/kubernetes/kubelet.conf get pods -n <namespace>
```

This process allows us to gain insights into the Kubelet's configuration and its interaction with the Kubernetes cluster.

```sh
root@kubeletauthz-worker:/# kubectl --kubeconfig=/etc/kubernetes/kubelet.conf get po -A
NAMESPACE            NAME                                                 READY   STATUS    RESTARTS   AGE
kube-system          coredns-5d78c9869d-hqnmt                             1/1     Running   0          23m
kube-system          coredns-5d78c9869d-mcvv7                             1/1     Running   0          23m
kube-system          etcd-kubeletauthz-control-plane                      1/1     Running   0          23m
kube-system          kindnet-ccht8                                        1/1     Running   0          22m
kube-system          kindnet-hj2dh                                        1/1     Running   0          23m
kube-system          kindnet-ttdr7                                        1/1     Running   0          22m
kube-system          kube-apiserver-kubeletauthz-control-plane            1/1     Running   0          23m
kube-system          kube-controller-manager-kubeletauthz-control-plane   1/1     Running   0          23m
kube-system          kube-proxy-2gn7z                                     1/1     Running   0          22m
kube-system          kube-proxy-bspz6                                     1/1     Running   0          23m
kube-system          kube-proxy-trgxh                                     1/1     Running   0          22m
kube-system          kube-scheduler-kubeletauthz-control-plane            1/1     Running   0          23m
local-path-storage   local-path-provisioner-6bc4bddd6b-jrxmn              1/1     Running   0          23m
```

Usually, to check the rights of a principal in Kubernetes we'd use the command `kubectl auth can-i --list` and if we try that with the Kubelet credentials we get back something like this:

```sh
kubectl --kubeconfig=/etc/kubernetes/kubelet.conf auth can-i --list

Warning: the list may be incomplete: node authorizer does not support user rule resolution
Resources                                                       Non-Resource URLs   Resource Names   Verbs
selfsubjectaccessreviews.authorization.k8s.io                   []                  []               [create]
selfsubjectrulesreviews.authorization.k8s.io                    []                  []               [create]
certificatesigningrequests.certificates.k8s.io/selfnodeclient   []                  []               [create]
                                                                                                                                [/api/*]            []               [get]
                                                                                                                                [/api]              []               [get]
                                                                                                                                [/apis/*]           []               [get]
                                                                                                                                [/apis]             []               [get]
                                                                                                                                [/healthz]          []               [get]
                                                                                                                                [/healthz]          []               [get]
                                                                                                                                [/livez]            []               [get]
                                                                                                                                [/livez]            []               [get]
                                                                                                                                [/openapi/*]        []               [get]
                                                                                                                                [/openapi]          []               [get]
                                                                                                                                [/readyz]           []               [get]
                                                                                                                                [/readyz]           []               [get]
                                                                                                                                [/version/]         []               [get]
                                                                                                                                [/version/]         []               [get]
                                                                                                                                [/version]          []               [get]
                                                                                                                                [/version]          []               [get]
```

A noteworthy observation is the absence of permissions associated with the pod objects we've examined. The key to understanding this situation lies in the warning message at the top, which explicitly mentions that the node authorizer lacks support for user rule resolution.

As a quick aside, it might be perplexing that the Kubelet doesn't utilize Role-Based Access Control (RBAC), especially considering the presence of the clusterrole named `system:node` that seemingly grants rights to nodes. However, it's important to note that the corresponding clusterrolebinding associated with `system:node` lacks any subjects, rendering it ineffectual. This peculiarity adds an intriguing layer to the authorization mechanisms within the cluster.

## 👮‍♀️ Understanding the Node Authorizer

To shed light on this scenario, let's take a closer look at how the Kubernetes API server is configured. If you examine the parameters provided to the kube-apiserver component, you'll notice the line `--authorization-mode=Node,RBAC`. This configuration tells us that two authorization modes are in play, and, as mentioned earlier, their permissions stack up.

The Node authorization mode has a singular purpose: to grant permissions to Kubelets. According to the documentation, this mode specifically allows access to resources that Kubelets require, such as pods, nodes, configmaps, and secrets. However, it's important to note that it also enforces restrictions to ensure that a Kubelet on one node can't access secrets meant for pods running on a different node.

For the nitty-gritty details of what's allowed and what's restricted, you'd need to dive into the codebase, where the rules governing Kubelet access within the cluster are defined. Understanding these rules is essential for maintaining security and proper access control in your Kubernetes environment.

```go
// NodeAuthorizer authorizes requests from kubelets, with the following logic:
//  1. If a request is not from a node (NodeIdentity() returns isNode=false), reject
//  2. If a specific node cannot be identified (NodeIdentity() returns nodeName=""), reject
//  3. If a request is for a secret, configmap, persistent volume, resource claim, or persistent volume claim, reject unless the verb is get, and the requested object is related to the requesting node:
//     node <- configmap
//     node <- pod
//     node <- pod <- secret
//     node <- pod <- configmap
//     node <- pod <- pvc
//     node <- pod <- pvc <- pv
//     node <- pod <- pvc <- pv <- secret
//     node <- pod <- ResourceClaim
//  4. For other resources, authorize all nodes uniformly using statically defined rules
```

You can see this in effect if you try to get secrets from a cluster with Kubelet credentials:

```sh
kubectl --kubeconfig=/etc/kubernetes/kubelet.conf get secrets -A
Error from server (Forbidden): secrets is forbidden: User "system:node:kubeletauthz-worker" cannot list resource "secrets" in API group "" at the cluster scope: can only read namespaced object of this type
```

One important point to note on this is where the logic is "reject", this just passes the request to other configured authorization modes, so if cluster RBAC has been modified to allow the `system:nodes` group to do something in excess of what the Node authorization mode allows then that will still be allowed.

You can see this by, for example, editing the `system:node` clusterrolebinding to add the `system:nodes` group as a subject, by adding these lines to it:

```yaml
subjects:
- apiGroup: rbac.authorization.k8s.io
    kind: Group
    name: system:nodes
```

After completing the setup and configuration, when you use Kubelet credentials to attempt to access secrets at the cluster level, it should indeed work without issues:

```sh
kubectl --kubeconfig=/etc/kubernetes/kubelet.conf get secrets -A
NAMESPACE     NAME                     TYPE                            DATA   AGE
kube-system   bootstrap-token-abcdef   bootstrap.kubernetes.io/token   6      34m
```

There are a couple of places where this mode can't effectively restrict permissions, which are in node and pod properties, for that we need another component.

## 🛂 NodeRestriction Admission Controller

In addressing the NodeRestriction Admission Controller, we encounter a specialized admission controller designed to enhance security within Kubernetes. Its primary role is to carefully scrutinize requests originating from Kubelets. Specifically, it focuses on requests related to pods and nodes, aiming to restrict access rights to only those that are pertinent to the functioning of the Kubelet. As an illustrative example, this controller limits the ability to modify certain properties of node objects. This restriction serves a crucial purpose by preventing unauthorized changes, such as altering a node's security classification.

## ☸️ Variations in Kubernetes Distributions

A noteworthy aspect of working with Kubernetes is the considerable variability among different distributions. It is essential to bear in mind that the discussion presented thus far pertains primarily to the standard Kubernetes setup, often referred to as "vanilla Kubernetes," particularly when configured using Kubeadm. However, it's important to recognize that Kubernetes distribution providers have the flexibility to customize this configuration. Indeed, many providers exercise this freedom to adapt Kubernetes to their specific requirements. As an example, [Azure AKS](https://azure.microsoft.com/en-us/services/kubernetes-service/), Microsoft's Kubernetes service, may deviate from the default configuration by allowing Kubelets to access secrets at the cluster level. These variations underscore the need for flexibility and adaptability in managing Kubernetes across diverse environments.

## ✨ Conclusion

Concluding our exploration of Kubernetes authorization, it is evident that while Role-Based Access Control (RBAC) remains the prevalent choice in most Kubernetes clusters, it may not always suffice to ensure a comprehensive level of security. There are instances where additional layers of security measures become essential. This is where supplemental authorization modes and admission controllers come into play. In this discussion, we've specifically examined the Node authorization mode and the NodeRestriction admission controller. These components play a crucial role in granting Kubelets the necessary rights and privileges to access the essential resources required for their smooth operation. Thus, Kubernetes administrators should consider these supplemental measures alongside RBAC to fortify their cluster's security posture and ensure it meets the specific demands of their use cases.

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
