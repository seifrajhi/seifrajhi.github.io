---
id: 28c38184a29b4a0869662019
path: "/blog/cedar-aws-k8s/"
date: "2024-11-22 21:40:00"
published: true
title: "Simplify Authorization Management with Cedar by AWS"
cover: "./cedar-cover.png"
excerpt: "Discover how Cedar by AWS can streamline the creation and management of fine-grained authorization policies, including for Kubernetes."
keywords:
  - Authorization
  - AWS
  - Policy Management
  - DevOps
  - Cedar
  - Kubernetes
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Simplify Authorization Management with Cedar by AWS**

## ⚡ Introduction

AWS recently introduced Cedar that simplifies managing authorization policies. Cedar allows you to define and manage complex authorization rules as reusable components, making your life easier and your applications more secure.

## What is Cedar?

Cedar is an open-source project by AWS that helps you create and manage fine-grained authorization policies. By defining these policies separately from your application code, you can update, analyze, and audit them independently.

## How does Cedar work?

Cedar uses a simple yet expressive language to define authorization policies. When you apply a policy, Cedar:

1. Validates the policy against a schema.
2. Evaluates access requests in real-time.
3. Provides detailed analysis and optimization tools.

## Cedar Policies

A Cedar policy specifies who can do what with which resources. It supports common authorization models like Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).

### Example Cedar Policy

Here's an example of a Cedar policy that allows a user named "alice" to view photos in the "jane_vacation" album:

```shell
permit (
  principal == User::"alice",
  action == Action::"view",
  resource in Album::"jane_vacation"
);
```

### Example Entities

Cedar represents principals, resources, and actions as entities. Here's an example of entities in JSON format:

```json
[
    {
        "uid": { "type": "User", "id": "alice"} ,
        "attrs": {"age": 18},
        "parents": []
    },
    {
        "uid": { "type": "Photo", "id": "VacationPhoto94.jpg"},
        "attrs": {},
        "parents": [{ "type": "Album", "id": "jane_vacation" }]
    }
]
```

## Getting Started with Cedar

### Installation

To use Cedar in your application, add the `cedar-policy` crate as a dependency:

```sh
cargo add cedar-policy
```

### Testing Your Policy

You can test your policy using the Cedar CLI:

```sh
cargo run authorize \
    --policies policy.cedar \
    --entities entities.json \
    --principal 'User::"alice"' \
    --action 'Action::"view"' \
    --resource 'Photo::"VacationPhoto94.jpg"'
```

CLI output:

```
ALLOW
```

This request is allowed because "VacationPhoto94.jpg" belongs to "jane_vacation", and "alice" can view photos in that album.

## Cedar for Kubernetes

Cedar for Kubernetes allows users to enforce access control on Kubernetes API requests using Cedar policies. Users can dynamically create authorization policies for Kubernetes that support features like request or user attribute-based rules, label-based access controls, conditions, and enforce denial policies. Users can also create admission policies in the same file as authorization policy, giving policy authors a single language to write and reason about.

### Cedar Access Controls for Kubernetes

AWS has announced a new open-source project, Cedar access controls for Kubernetes. This project brings the power of Cedar to Kubernetes authorization and admission validation, enabling cluster administrators to use a unified access control language for principals making API calls. With Cedar access controls for Kubernetes, administrators can dynamically create authorization policies that support features like request or user attribute-based rules, label-based access controls, conditions, and denial policies.

### Background: Kubernetes Authorization and Admission

Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. Central to Kubernetes is an API server that supports multiple extension points, and Cedar integrates into two of these steps: the authorization and validating admission phase. After a request is authenticated, Kubernetes performs authorization for nodes, a pluggable authorization to an external webhook (powered by Cedar in this case), and the built-in Role-Based Access Control (RBAC). 

Authorization in Kubernetes is intended to be fast, so the body of the requested action is not serialized or evaluated: just the authentication information, the verb, and the contents of the URL are evaluated. In a Kubernetes request, the URL contains data like the API group, what resource type is being acted on ("pods", "secrets", "nodes", etc.), a possible namespace, or the specific resource's name. If a request passes authorization, it proceeds through several phases and then reaches the validating admission step. Admission validation allows administrators to allow or deny mutating requests (create/update/delete) with the requested object included, and Cedar policies can also be evaluated in this step.

### Demonstration

Let's walk through an example of capabilities that Cedar enables. As a Kubernetes administrator, you want to allow some users to create and manage Kubernetes ConfigMaps to store configuration data, but you only want those users to view and modify ConfigMaps they own. Enforcing this kind of control is possible today in Kubernetes, but requires you to use RBAC and a validating admission webhook with a separate policy language.

First, we'll write an authorization policy permitting users to view and manage ConfigMaps.

```shell
permit (
    principal in k8s::Group::"requires-labels",
    action in [
        k8s::Action::"create",
        k8s::Action::"update",
        k8s::Action::"patch",
        k8s::Action::"delete",
        k8s::Action::"list",
        k8s::Action::"watch"],
    resource is k8s::Resource
) when {
    resource.apiGroup == "" && // "" is the core Kubernetes API group
    resource.resource == "configmaps"
};
```

This policy grants users in the group "requires-labels" the ability to create, update, patch, delete, list, and watch ConfigMap objects. So far, this is comparable to an RBAC policy in Kubernetes. Now, let's add a policy to prevent users from listing or watching for ConfigMaps they do not own.

```shell
forbid (
    principal is k8s::User in k8s::Group::"requires-labels",
    action in [k8s::Action::"list", k8s::Action::"watch"],
    resource is k8s::Resource
) unless {
    resource has labelSelector &&
    resource.labelSelector.contains({
        "key": "owner",
        "operator": "=",
        "values": [principal.name]
    })
};
```

Unlike RBAC, we can define explicit denials in authorization. This policy forbids users in the group "requires-labels" from making list or watch requests against any resource unless they include a label selector in their request. This policy leverages a new alpha-level feature gate AuthorizeWithSelectors in Kubernetes v1.31 that allows the Cedar authorizer to make decisions on field and label selectors included in a request. Now let's restrict what the users can create or update.

```shell
forbid (
    principal is k8s::User in k8s::Group::"requires-labels",
    action in [
        k8s::admission::Action::"create",
        k8s::admission::Action::"update",
        k8s::admission::Action::"delete"],
    resource
) unless {
    resource has metadata &&
    resource.metadata has labels &&
    resource.metadata.labels.contains({"key": "owner", "value": principal.name})
};
```

You may notice that the action in this policy has a different prefix than the authorization policies. Because Kubernetes does not include the content of the resource in authorization but does in admission validations, we use actions in separate Cedar namespaces for authorization and admission. Authorization actions apply to k8s::Resource types and admission actions apply to Kubernetes types. Finally, we need one more admission policy:

```shell
forbid (
    principal is k8s::User in k8s::Group::"requires-labels",
    action == k8s::admission::Action::"update",
    resource
) unless {
    resource has oldObject &&
    resource.oldObject has metadata &&
    resource.oldObject.metadata has labels &&
    resource.oldObject.metadata.labels.contains(
        {"key": "owner", "value": principal.name})
};
```

Similar to the first admission policy, we write a policy that applies to update operations. When a user makes an update request, the validating admission request not only includes the updated object, but also includes the object before it was modified. This enables us to prevent principals from overwriting the owner label on a resource that doesn't belong to the principal.

Now we can try this policy out! We have created a local Kubernetes cluster in a VM using Kind, and applied the above policy. We have created a kubeconfig for a user named "sample-user", and included them in the group "requires-labels" (the GitHub project has full setup instructions for you to try this out).

```sh
# set our KUBECONFIG file to a sample user in our Kind cluster
$ export KUBECONFIG=./mount/sample-user-kubeconfig.yaml
$ kubectl auth whoami
ATTRIBUTE   VALUE
Username    sample-user
Groups      [sample-group requires-labels system:authenticated]
```

Now, let's see what that user can do. First, we'll try to see what ConfigMaps exist, and create a new one.

```sh
$ kubectl get configmap
Error from server (Forbidden): configmaps is forbidden: \
  User "sample-user" cannot list resource "configmaps" in API group "" \
  in the namespace "default": \
  {"reasons":[{"policy":"label-enforcement-policy1","position":{
      "filename":"label-enforcement-policy","offset":671,"line":21,"column":1}}]}

Sure, continuing from where we left off:

```sh
$ kubectl create configmap sample-config --from-literal=k1=v1
error: failed to create configmap: \
    admission webhook "vpolicy.cedar.k8s.aws" denied the request: \
    [{"policy":"label-enforcement-policy2","position":{
         "filename":"label-enforcement-policy","offset":1226,"line":36,"column":1}}]
```

In the first request, our kubectl get request resulted in a list operation. This was permitted in the first policy, but denied in the second policy (the zero-indexed "label-enforcement-policy1") that forbids list/watch resource requests without a label selector. The second request was similarly permitted in the first authorization policy, but denied in admission policy "label-enforcement-policy2".

Next, let's try to make requests that use ownership labels.

```sh
$ kubectl get configmap --selector owner=sample-user --show-labels
No resources found in default namespace.

# Construct a configmap with the proper owner label
$ cat << EOF > sample-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: sample-config
  labels:
    owner: sample-user
data:
  stage: test
EOF

$ kubectl create -f ./sample-config.yaml
configmap/sample-config created

$ kubectl get configmap --selector owner=sample-user --show-labels
NAME            DATA   AGE   LABELS
sample-config   1      19s   owner=sample-user
```

And they all succeeded! When we made list or create requests using the owner labels, they were permitted because each forbid statement's unless clause was satisfied.

### Additional Features

Beyond the ability to enforce Cedar-based permissions in Kubernetes, the project provides a few other features:

- A Custom Resource Definition (CRD) for storing Cedar policies in a Kubernetes cluster.
- A converter that works with any RBAC bindings and policies to rewrite them in Cedar. RBAC policies continue to work in clusters with Cedar enabled, they are only evaluated when no Cedar rules explicitly allow or forbid a request.
- Support for authorizing Kubernetes impersonation on UIDs, usernames, and groups.
- A Cedar schema generator for Kubernetes built-in types and CRDs, so policies can be validated before creation.

### Limitations

This project is a public experiment for how Cedar policies can be used to enforce authorization in Kubernetes. We think this project holds a lot of possibilities for enabling more secure policies in Kubernetes, but there are limitations and tradeoffs to be aware of. One worth mentioning here is that Cedar doesn't work well with optional nested fields on sets of structures. While Cedar has operators that can test set membership or set overlap, it does not have a way to map a general operation on a set of objects. This is by design: It ensures that Cedar policies are efficiently and precisely analyzable, in the sense that they can be represented in formal logic for purposes of automating policy reasoning. As a result, Cedar is not able to enforce common Kubernetes policies like ensuring all container images on a pod are from a specific container registry, or that all containers have CPU and memory limits set. If this is an issue for you, Cedar is still a great upgrade for the authorization component, but other tooling like Open Policy Agent Gatekeeper or Kyverno may be a better fit for those policies. For a full list of features, limitations, and a walkthrough to try this out for yourself in a Kind cluster, see the GitHub repository. We can't wait to see what kind of policies you write!

### Can I use Cedar for Kubernetes policy enforcement?

While Cedar offers powerful authorization guarantees, there are policy enforcement requirements common to Kubernetes that are not formally analyzable. For example, enforcing that all containers in all pods have a maximum memory limit set. Cedar is powered by automated reasoning, including an SMT solver, which does not implement loops or map functions. Rather than viewing Cedar as a replacement for tools like Open Policy Agent/Gatekeeper or Kyverno, it is best seen as an additional tool for access control enforcement.

## Conclusion

Cedar by AWS offers a powerful and flexible way to manage authorization policies. By separating policy management from application code, you can ensure your security model is robust and adaptable. For more details, check out the Cedar documentation.

> 📻🧡 For more information, check out the [Cedar documentation](https://docs.cedarpolicy.com) and explore the [Cedar examples repository](https://github.com/cedar-policy/cedar-examples).

<br>

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**


🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
