---
id: db7793ca75cc619408d46e87
path: "/blog/kubernetes-pod-scheduling-strategies/"
date: "2024-10-26 17:34:00"
published: true
title: "Pod Scheduling in Kubernetes: Control the Placement of Your Pods ☸️"
cover: "./schedule-cover.jpg"
excerpt: "Explore effective strategies for pod scheduling in Kubernetes to optimize resource utilization."
keywords:
  - Kubernetes
  - Pod Scheduling
  - Node Placement
  - Resource Management
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Pod to Node Scheduling Strategies 🐳**

## 📌 Overview

By default, Kubernetes places pods randomly across the available nodes in the cluster. However, there are many scenarios where you may need to control the placement of your pods on specific nodes.

For example, you may want to place pods that require specific hardware resources (e.g., GPUs) on nodes that have those resources available or avoid placing pods on nodes that are running other critical workloads.

Kubernetes provides a number of features for controlling pod placement, including: Node selectors, Affinity and anti-affinity rules, Taints and tolerations.

In this article, we will discuss the different approaches to advanced pod scheduling in Kubernetes and provide examples of how to use them to solve common use cases.

## Use Cases for Pod-to-Node Scheduling in Kubernetes

In the Kubernetes environment, it is often necessary to customize how pods are scheduled to nodes. Here are some of the most common scenarios where advanced pod scheduling can be beneficial:

### 🚀 Running Pods on Nodes with Dedicated Hardware

Some Kubernetes applications may have specific hardware requirements. For example, pods running machine learning jobs may require high-performance GPUs instead of CPUs, while Elasticsearch pods may perform better on SSDs than HDDs. As a result, it is best practice for any resource-aware Kubernetes cluster management strategy to assign pods to the nodes with the appropriate hardware.

### 🤝 Pod Colocation and Codependency

In a microservices environment or a tightly coupled application stack, it may be necessary to colocate certain pods on the same machine to improve performance, avoid network latency issues, and prevent connection failures. For example, it is generally recommended to run a web server on the same machine as an in-memory cache service or database.

### 📍 Data Locality

Data-intensive applications may have similar data locality requirements to the previous use case. To ensure faster reads and better write throughput, these applications may need the databases to be deployed on the same machine as the customer-facing application.

### 🔄 High Availability and Fault Tolerance

To make application deployments highly available and fault-tolerant, it is a good practice to run pods on nodes deployed in separate availability zones.

## 🛠️ Node Taints and Pods Tolerations

[Taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) provide a powerful mechanism for controlling the allocation of pods to specific nodes in a Kubernetes cluster. The concept is simple yet effective: a taint sets restrictions on a node, dictating which pods can or cannot be scheduled on it, while a toleration allows a pod to resist the effects of taints and be scheduled on specific nodes.

### 🌟 Taints

A taint is a key-value pair that specifies a node condition and its effect. The effect can be either `NoSchedule` or `PreferNoSchedule`. A `NoSchedule` taint prevents any pod without a matching toleration from being scheduled on the node. A `PreferNoSchedule` taint signals to the scheduler that it should avoid scheduling pods on the node, but does not prevent it.

You can use the `kubectl taint` command to taint the nodes:

```shell
kubectl taint nodes <node-name> <key>=<value>:<taint-effect>
```

### 🌟 Tolerations

A toleration is a key-value pair that specifies a node condition and its effect. The effect can be either `NoExecute` or `Effect`. A `NoExecute` toleration prevents a pod from being evicted from a node with a matching taint. An `Effect` toleration allows a pod to be scheduled on a node with a matching taint, even if the pod does not have a toleration for that taint.

There are pre-defined 3 effects as follows:

- **NoSchedule**: Do not place the pods unless they can tolerate the taint.
- **PreferNoSchedule**: Try to avoid scheduling the pods that cannot tolerate the taint. Not guaranteed.
- **NoExecute**: By the time taint is enabled on the nodes, the existing pods will be terminated if the pods cannot tolerate the taint.

For instance, you can create a scenario where only pods with critical services, such as controllers, are allowed to run on a particular node.

Implementing taints and tolerations is quite simple. First, add a taint to a node that needs to apply some non-standard scheduling behavior. For example:

```shell
kubectl taint nodes node01 critical=true:NoSchedule
node "node01" tainted
```

Creating a taint is only the first part of the configuration. To allow pods to be scheduled on a tainted node, we need to add the toleration:

```yaml
apiVersion: v1
metadata:
    name: taint-toleration
spec:
    containers:
    - name: taint-toleration
        image: nginx
        resources:
            requests:
                cpu: 0.8
                memory: 4Gi
            limits:
                cpu: 3.0
                memory: 22Gi
        tolerations:
        - key: "critical"
            operator: "Equal"
            value: "true"
            effect: "NoSchedule"
```

In this example, I added the toleration for the above taint using the "Equal" operator. I could also use the "Exists" operator, which will apply toleration to any node matching the key of the taint. However, the value doesn't need to be specified.

An important fact to remember is that the toleration will not guarantee that the pod will only be placed in the tainted node. If the other nodes are not tainted, the above pod can be placed in those nodes as well as the un-tainted nodes are free to accept any pods.

## 🗂️ Choosing a Node by a Pod: `nodeName`, `nodeSelector`, and `nodeAffinity`

Another approach is configuring a Pod in such a way that it chooses which Node to run on. For this, we have `nodeName`, `nodeSelector`, `nodeAffinity`, and `nodeAntiAffinity`. [See Assign Pods to Nodes](https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes/).

### 🔹 `nodeName`

The most straightforward way. Has precedence over all others:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: nginx
spec:
    containers:
    - name: my-nginx
        image: nginx:latest
    nodeName: host01
```

### 🔹 `nodeSelector`

In essence, `nodeSelector` is a label-based pod-to-node scheduling method where users assign certain labels to nodes and make sure that the `nodeSelector` field matches those labels.

For example, let's assume that one of the node labels is `storage=ssd` to indicate the type of storage on the node.

```shell
kubectl describe node "host01"
```

```yaml
Name: host01
Roles: node
Labels: critical=true,
...
```

To schedule pods onto the node with this label, specify the `nodeSelector` field with that label in the Pod manifest.

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: nginx
    labels:
        env: dev
spec:
    containers:
    - name: my-nginx
        image: nginx:latest
        imagePullPolicy: IfNotPresent
    nodeSelector:
        critical: true
```

Node selectors are the simplest method of advanced pod scheduling. However, they are not very useful when other rules and conditions should be considered during pod scheduling.

### 🔹 `nodeAffinity` and `nodeAntiAffinity`

`nodeAffinity` and `nodeAntiAffinity` operate in the same way as `nodeSelector`, but have more flexible capabilities.

For example, you can set hard or soft launch limits. For a soft limit, the scheduler will try to launch a Pod on the corresponding Node, and if it cannot, it will launch it on another. Accordingly, if you set a hard limit and the scheduler cannot start the Pod on the selected Node, the Pod will remain in Pending status.

The hard limit is set in the field `.spec.affinity.nodeAffinity` with the `requiredDuringSchedulingIgnoredDuringExecution`, and the soft limit is set with the `preferredDuringSchedulingIgnoredDuringExecution`.

In the example below, we use node affinity to place pods on nodes in specific availability zones.

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: node-affinity
spec:
    affinity:
        nodeAffinity:
            requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                - matchExpressions:
                    - key: kubernetes.io/cp-az-name
                        operator: In
                        values:
                        - cp-1a
                        - cp-1b
            preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 7
                preference:
                    matchExpressions:
                    - key: custom-key
                        operator: In
                        values:
                        - custom-value
    containers:
    - name: node-affinity
        image: your-container-image
```

"Hard" affinity rules are specified under the `requiredDuringSchedulingIgnoredDuringExecution` field of the `nodeAffinity` section of the pod manifest. In this example, the scheduler is instructed to place the pod only on nodes with the label that has a key `kubernetes.io/cp-az-name` and values `cp-1a` or `cp-1b`.

To achieve this, the `In` logical operator is used to filter the array of existing label values. Other operators include `NotIn`, `Exists`, `DoesNotExist`, `Gt`, and `Lt`.

The "soft" rule is specified under the `preferredDuringSchedulingIgnoredDuringExecution` field of the spec. In this example, it states that among the nodes that meet "hard" criteria, nodes with a label that has a key named `custom-key` and the value `custom-value` are preferred. However, if no such nodes exist, scheduling pods to other candidates that meet the "hard" criteria is acceptable.

It's a good practice to construct node affinity rules incorporating both "hard" and "soft" rules. Following this "best-effort" approach makes deployment scheduling more flexible and predictable.

### 🔹 `podAffinity` and `podAntiAffinity`

Similar to selecting a Node using hard and soft limits, you can adjust Pod Affinity depending on what labels Pods already running on the Node will have. See [Inter-pod affinity and anti-affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity).

Inter-pod affinity is defined similarly to node affinity. In this case, the `podAffinity` field of the pod spec is used.

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: example-pod-affinity
spec:
    affinity:
        podAffinity:
            requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                    matchExpressions:
                    - key: security
                        operator: In
                        values:
                        - S1
                topologyKey: failure-domain.beta.kubernetes.io/zone
    containers:
    - name: pod-affinity
        image: your-container
```

Similar to node affinity, pod affinity supports match expressions and logical operators. In this case, they are applied to the label selector of the pods running on a particular node. If the specified expression matches the pod label of the target pod, a new pod is collocated with the target pod on the same machine.

It's possible to repel pods from each other via the pod anti-affinity feature. As mentioned above, one of the best practices in Kubernetes is to avoid a single point of failure by spreading pods across different availability zones. Similar behavior can be configured in the anti-affinity part of the pod spec. For pod anti-affinity, two pods are needed:

The first pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: s1
    labels:
        security: s1
spec:
    containers:
    - name: c1
        image: first-image
```

Note that the first pod has the label `security: s1`.

The second pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: s2
spec:
    affinity:
        podAntiAffinity:
            requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                    matchExpressions:
                    - key: security
                        operator: In
                        values:
                        - s1
                topologyKey: kubernetes.io/hostname
    containers:
    - name: pod-anti-affinity
        image: second-image
```

The second pod refers to the label selector `security: s1` under the `spec.affinity.podAntiAffinity`. As a consequence, this pod won't be scheduled to a node that already hosts any pods with the label `security: s1`.

### 🔹 `topologySpreadConstraints`

First, imagine a cluster of twenty nodes. You want to run a workload that automatically scales its replica number. It can scale anywhere from two to twenty Pods, and you want to run those replicas on as many separate nodes as possible. This approach helps to minimize the risk of a node failure affecting the workload.

Then let's think about an application with fifteen replicas running on three nodes in the same Availability Zone, with five Pods on each node. You've mitigated the node failure risk, but clients interacting with the workload come from three distinct zones — and traffic spanning different AZs results in higher latency and network costs.

You can reduce them by distributing Pods across nodes in different AZs and routing clients to the instances inside the relevant zone. Deploying the workload in multiple zones in addition to running it on several nodes further decreases the risk of a failure affecting your Pods.

Normally, you'd want to distribute workloads evenly across every failure domain. You can configure that with pod topology constraints — and to do so, use the `spec.topologySpreadConstraints` field.

#### How pod topology spread constraints work

Here's an example of a pod topology spread constraint:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: example-pod
spec:
    topologySpreadConstraints:
    - maxSkew: <integer>
        minDomains: <integer> # optional
        topologyKey: <string>
        whenUnsatisfiable: <string>
        labelSelector: <object>
        matchLabelKeys: <list> # optional
        nodeAffinityPolicy: [Honor|Ignore] # optional
        nodeTaintsPolicy: [Honor|Ignore] # optional
```

You can find a full explanation of each element in the [Kubernetes documentation](https://kubernetes.io/docs/concepts/workloads/pods/pod-topology-spread-constraints/). For now, let's briefly outline the obligatory fields:

- **`maxSkew`**: The degree to which your Pods can be distributed unevenly across all zones. Its value must be more than zero.
- **`topologyKey`**: The key of node labels. Nodes with the same label and values belong to the same topology. Each topology instance is a domain to which the scheduler tries to assign a balanced number of pods.
- **`whenUnsatisfiable`**: Lets you decide what to do with a Pod when it doesn't satisfy your spread constraint:
    - `DoNotSchedule` instructs the scheduler not to schedule it.
    - `ScheduleAnyway` tells the scheduler to schedule it and prioritize the nodes minimizing the skew.
- **`labelSelector`**: Allows finding matching Pods. The number of Pods in their corresponding topology domain is based on the Pods matching the label selector.

## 📑 Conclusion

Advanced pod scheduling in Kubernetes is a powerful tool that can be used to improve the performance, availability, and resilience of your containerized applications. By understanding the different features available and how to use them, you can control the placement of your pods to meet the specific needs of your application.

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
