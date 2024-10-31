---
id: 42117c92c5c55eee1f154725
path: "/blog/kubernetes-validation-cel/"
date: "2024-10-31 19:30:00"
published: true
title: "Introducing Kubernetes Validation with Common Expression Language (CEL) ☯"
cover: "./kubernetes-cel-cover.png"
excerpt: "Simplify complex validations in Kubernetes with Common Expression Language (CEL) and Kyverno policies."
keywords:
  - Kubernetes
  - Validation
  - Common Expression Language
  - k8s
  - Kyverno
  - DevOps
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Simplify Complex Validations with CEL and Kyverno Policies ☯**

## 🔆 Introduction

Kubernetes is extensible and allows users to create [Custom Resources (CR)](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#custom-resources) and [Custom Resource Definitions (CRD)](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) that define the structure and meta-attributes of future resources. However, creating complex validation webhooks for each CRD can be an operational and development overhead.

Kubernetes now provides a solution in the form of the [Common Expression Language (CEL)](https://kubernetes.io/docs/reference/using-api/cel/). CEL is a simple yet powerful language that allows you to define complex validation rules directly in the Kubernetes API server. With CEL, you can introduce complex validations without creating your own validating webhooks in code.

[Kyverno](https://kyverno.io/) is a Kubernetes-native policy engine that allows you to define policies as code. With Kyverno, you can enforce best practices, security standards, and compliance requirements.

By using CEL expressions in Kyverno policies, you can simplify your validation rules and make them more expressive.

In this blog post, we'll explore how to use CEL expressions in Kyverno policies to simplify your Kubernetes validation rules. We'll walk through examples of using CEL expressions in Kyverno policies to enforce policies for your Kubernetes resources.

So, if you're looking to simplify your Kubernetes validation rules and make them more expressive, read on to learn how to use CEL expressions in Kyverno policies.

## CEL and Validation in Kubernetes

Kubernetes Custom Resource Definitions (CRDs) support validation through [structural schemas](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#specifying-a-structural-schema), [OpenAPI v3 validation rules](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#validation), [custom validators](https://thenewstack.io/developer-guardrails-with-custom-kubernetes-resource-validators/), and [admission webhooks](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).

CRD structural schemas provide type checking, while OpenAPI v3 validation rules offer regex, range, and size limits. Custom validators can be written in various languages, and admission webhooks are used for more complex validation scenarios.

To address the need for self-contained validation, Kubernetes introduced Common Expression Language (CEL) into CRDs. CEL is a lightweight, safe, and easy-to-use expression language that supports pre-parsing and type checking at CRD registration time. This allows syntax and type errors to be caught before the CRD is deployed, improving cluster operability and reducing the need for webhooks. CEL is chosen for its simplicity, flexibility, and ability to express validation rules in a declarative manner. This choice aligns with Kubernetes' goal of providing a simple and consistent validation framework for CRDs.

---

### A Deep Dive into CEL

Kubernetes CRDs support validation through CEL to ensure the correctness and consistency of custom resources. This feature, introduced in Kubernetes 1.25, allows developers to define validation rules using CEL expressions, which are declarative and lightweight. CEL validation rules are scoped to the location of the `x-kubernetes-validations` extension in the CRD schema, and the `self` variable in the CEL expression is bound to the scoped value. All validation rules are scoped to the current object, and cross-object or stateful validation rules are not supported.

For example, a validation rule using `x-kubernetes-validations` could be:

```yaml
openAPIV3Schema:
  type: object
  properties:
    spec:
      type: object
      properties:
        cpu:
          type: string
          x-kubernetes-validations:
          - rule: "self.cpu in ['1', '2', '4']"
            message: "CPU should be one of 1, 2, or 4."
        required:
          - cpu
```

[CEL validation rules support a wide range of use cases, and they were promoted to GA in Kubernetes 1.29](https://github.com/kubernetes/kubernetes/issues/121164). This feature has been adopted by many Kubernetes ecosystem projects and is widely used in the Kubernetes community. CEL validation rules provide a lightweight and self-contained validation mechanism that reduces the need for admission webhooks and simplifies the development and operability of CRDs. They also allow users to define complex validation rules in a declarative manner, improving the readability and maintainability of the CRD schema.

---

### Kyverno: A Policy Engine for k8s Resource Validation

Kyverno is a policy engine for Kubernetes that enables resource validation, change, and creation based on defined policies. It uses CEL expressions for validation, reducing the need for admission webhooks. [Kyverno policies](https://kyverno.io/policies/) consist of Match, Exclude, Validate, Mutate, Generate, and Verify Images clauses, allowing users to define complex validation rules in a declarative manner.

Kyverno policies provide a lightweight and self-contained validation mechanism that reduces the need for admission webhooks and simplifies the development and operability of CRDs. They also allow users to define complex validation rules in a declarative manner, improving the readability and maintainability of the CRD schema.

#### Using CEL Expressions in Kyverno Policies

CEL expressions in Kyverno policies are used in the validate section. The `message` field is used to display an error message when the expression evaluates to false. The `validationFailureAction` field is used to enforce the validation failure action when the expression evaluates to false.

CEL expressions in Kyverno policies can be used to validate various aspects of Kubernetes resources, such as resource limits, labels, and annotations. Kyverno also supports the automatic generation of policy rules for higher-level controllers, such as Deployments, DaemonSets, StatefulSets, and CronJobs.

To create a Kyverno policy that disallows CPU requests without a value, use the following example:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-cpu-requests-without-value
spec:
  validationFailureAction: Enforce
  background: false
  rules:
  - name: disallow-cpu-requests-without-value
    match:
      any:
      - resources:
          kinds:
            - Pod 
    validate:
      cel:
        expressions:
          - message: "CPU requests must have a value"
            expression: "object.spec.containers.all(container, has(container.resources.requests.cpu))"
```

Now, let's try deploying a pod without CPU requests:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: cpu-pod
spec:
  containers:
  - name: cpu-container
    image: nginx
    resources:
      requests:
        memory: "256Mi"
```

We can see that our policy is enforced. Great!

```shell
$ kubectl apply -f pod.yaml
Error from server: error when creating "pod.yaml": admission webhook "validate.kyverno.svc-fail" denied the request: 

resource Pod/default/cpu-pod was blocked due to the following policies 

disallow-cpu-requests-without-value:
  disallow-cpu-requests-without-value: CPU requests must have a value
```

Some other useful variables that we can use in CEL expressions are:
- `oldObject`: The existing object. The value is null for CREATE requests.
- `authorizer`: It can be used to perform authorization checks.
- `authorizer.requestResource`: A shortcut for an authorization check configured with the request resource (group, resource, (subresource), namespace, name).

#### CEL Preconditions in Kyverno Policies

The below policy ensures the `hostPort` field is set to a value between 5000 and 6000 for pods whose `metadata.name` is set to nginx:

```shell
kubectl apply -f - <<EOF
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-host-port-range
spec:
  validationFailureAction: Enforce
  background: false
  rules:
    - name: host-port-range
      match:
        any:
        - resources:
            kinds:
              - Pod
      celPreconditions:
          - name: "first match condition in CEL"
            expression: "object.metadata.name.matches('nginx')"
      validate:
        cel:
          expressions:
          - expression: "object.spec.containers.all(container, !has(container.ports) || container.ports.all(port, !has(port.hostPort) || (port.hostPort >= 5000 && port.hostPort <= 6000)))"
            message: "The only permitted hostPorts are in the range 5000-6000."
EOF
```

`spec.rules.celPreconditions` are CEL expressions. All celPreconditions must be evaluated to true for the resource to be evaluated. Therefore, any Pod with nginx in its `metadata.name` will be evaluated.

Let's try deploying an Apache server with `hostPort` set to 80:

```shell
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: apache
spec:
  containers:
  - name: apache-server
    image: httpd
    ports:
    - containerPort: 8080
      hostPort: 80
EOF
```

You'll see that it's successfully created because the validation rule wasn't applied to the new Pod as it doesn't satisfy the celPreconditions. That's exactly what we need.

```shell
Pod/apache created
```

Let's try deploying an Nginx server with `hostPort` set to 80:

```shell
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx-server
    image: nginx
    ports:
    - containerPort: 8080
      hostPort: 80
EOF
```

Since the new Pod satisfies the celPreconditions, the validation rule will be applied. As a result, the creation of the Pod will be blocked as it violates the rule.

```shell
Error from server: error when creating "STDIN": admission webhook "validate.kyverno.svc-fail" denied the request:
resource Pod/default/nginx was blocked due to the following policies

disallow-host-port-range:
  host-port-range: The only permitted hostPorts are in the range 5000-6000.
```

## Summary

The blog provides a good understanding of the Common Expression Language (CEL) and its application in Kubernetes `ValidatingAdmissionPolicies`. It shows the significance of CEL in validating Custom Resource Definitions (CRDs) and its integration into Kyverno policies for resource validation. The post covers the features introduced in Kubernetes ValidatingAdmissionPolicies and demonstrates the use of CEL expressions in Kyverno policies to validate resources. It also emphasizes the benefits of using CEL for in-process validation, reducing the reliance on admission webhooks, and simplifying the development and operability of CRDs.

<br>

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  _**Until next time 🎉**_

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** [Saifeddine Rajhi](https://www.linkedin.com/in/rajhi-saif/)

**♻️ X/Twitter:** [@rajhisaifeddine](https://x.com/rajhisaifeddine)

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
