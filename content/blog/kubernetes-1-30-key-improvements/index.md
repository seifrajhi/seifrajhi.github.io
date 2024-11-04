---
id: 4920d0ccf88c1505963a3090
path: "/blog/kubernetes-1-30-key-improvements/"
date: "2024-04-19 20:00:00"
published: true
title: "Kubernetes 1.30: Key Improvements You Need to Know"
cover: "./k8s-1-30-cover.png"
excerpt: "Discover the key improvements in Kubernetes 1.30, including security enhancements, resource management, and more."
keywords:
    - Kubernetes
    - Kubernetes 1.30
    - Container Orchestration
    - Security Enhancements
    - Resource Management
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **v1.30 brings significant security enhancements and improved resource management**

## ☸️ Introduction

Kubernetes 1.30, set to be released on April 17th, 2024, introduces a host of new features and improvements that focus on enhancing the security, resource management, and overall cluster management capabilities of the popular container orchestration platform.

### 🛠️ Apps in Kubernetes 1.30

Kubernetes 1.30 introduces more granular failure reasons for `Job PodFailurePolicy`, a `PodHealthyPolicy` for [PodDisruptionBudget](https://github.com/orgs/kubernetes/projects/175/views/1?filterQuery=sig%3A%22sig-apps%22+&pane=issue&itemId=50864904), and a Job [Success/Completion Policy](https://github.com/orgs/kubernetes/projects/175/views/1?filterQuery=sig%3A%22sig-apps%22+&pane=issue&itemId=51299612). These features provide greater flexibility and control for managing and monitoring application workloads.

### 🖥️ CLI in Kubernetes 1.30

The CLI in Kubernetes 1.30 also sees several enhancements, such as the ability to [customize](https://github.com/orgs/kubernetes/projects/175/views/1?filterQuery=sig%3A%22sig-cli%22+&pane=issue&itemId=50111976) debug resources using the `--custom` flag in `kubectl debug`, the addition of subresource support to `kubectl`, and the introduction of an `--interactive` flag for the `kubectl delete` command to prevent accidental deletions.

### 📈 Instrumentation

Instrumentation has also been a focus in this release, with improvements to API Server tracing, metric cardinality enforcement, and the introduction of contextual logging. These features aim to enhance debugging, monitoring, and overall observability within Kubernetes environments.

### 🌐 Networking

On the networking front, Kubernetes 1.30 introduces changes to the Kubernetes cloud [controller manager's service controller](https://github.com/orgs/kubernetes/projects/175/views/1?filterQuery=sig%3A%22sig-network%22+&pane=issue&itemId=50945844), including the removal of transient node predicates and improvements to Ingress connectivity reliability. Additionally, the release makes Kubernetes more aware of LoadBalancer behavior, allowing cloud providers to better integrate their infrastructure with Kubernetes.

### 🖥️ Nodes

Enhancements to node management include the introduction of a 'sleep' action for the `PreStop` lifecycle hook, [node memory swap support](https://github.com/kubernetes/enhancements/issues/2400), and the integration of AppArmor for defining and enforcing security policies at the container level.

### 📅 Scheduling

Scheduling improvements in Kubernetes 1.30 include the introduction of [MatchLabelKeys](https://github.com/orgs/kubernetes/projects/175/views/1?filterQuery=sig%3A%22sig-scheduling%22+&pane=issue&itemId=50057836) for `PodAffinity` and `PodAntiAffinity`, the decoupling of `TaintManager` from the `NodeLifecycleController`, and the ability to make pod scheduling directives mutable when gated.

### 💾 Storage

Finally, in the storage domain, Kubernetes 1.30 introduces a feature to [prevent unauthorized volume mode conversio](https://github.com/orgs/kubernetes/projects/175/views/1?filterQuery=sig%3A%22sig-storage%22+&pane=issue&itemId=50211943)n during volume restore, addressing a potential security gap in the `VolumeSnapshot` functionality.

### 🔒 Support for User Namespaces in Pods

[User namespaces](https://kubernetes.io/docs/concepts/workloads/pods/user-namespaces) is a Linux-only feature that better isolates pods to prevent or mitigate several CVEs rated high/critical, including [CVE-2024-21626](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-21626), published in January 2024. In Kubernetes 1.30, support for user namespaces is migrating to beta and now supports pods with and without volumes, custom UID/GID ranges, and more!

### 📝 CEL for Admission Control

Integrating Common Expression Language (CEL) for admission control in Kubernetes introduces a more dynamic and expressive way of evaluating admission requests. This feature allows complex, fine-grained policies to be defined and enforced directly through the Kubernetes API, enhancing security and governance capabilities without compromising performance or flexibility.

[CEL's addition to Kubernetes admission control](https://github.com/kubernetes/enhancements/issues/3221) empowers cluster administrators to craft intricate rules that can evaluate the content of API requests against the desired state and policies of the cluster without resorting to Webhook-based access controllers. For more information on using CEL for admission control, see the [API documentation](https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy/).

### 🏁 Conclusion

Overall, Kubernetes 1.30 represents a significant step forward in enhancing the security, flexibility, and manageability of the platform, providing users with a more robust and reliable Kubernetes environment.

**References:**

- https://github.com/orgs/kubernetes/projects/175/views/1
- https://kubernetes.io/blog/2024/03/12/kubernetes-1-30-upcoming-changes/
- https://collabnix.com/whats-new-in-kubernetes-1-30-release/
- https://www.reddit.com/r/kubernetes/comments/1c57j8z/whats_new_in_kubernetes_130/
- https://sysdig.com/blog/whats-new-in-kubernetes-1-30/

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
