---
id: c542a5236a0fde8bc7c3cc8b
path: "/blog/hidden-gems-kubernetes/"
date: "2024-10-29 20:30:00"
published: true
title: "Hidden Gems: A Few Things You Might Not Know About Kubernetes 💎"
cover: "./hidden-gems-k8s-cover.png"
excerpt: "Explore the lesser-known aspects of Kubernetes, uncovering hidden features and tips that can enhance your cloud-native experience."
keywords:
  - Kubernetes
  - Hidden Features
  - Cloud-native
  - DevOps
  - k8s
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Lesser-Known Aspects of Kubernetes 💎**

## Overview 👀

Kubernetes has revolutionized the way we manage containerized applications, but it's packed with hidden features that even experienced users might not be aware of.

Let's dive into a few of these hidden gems and discover the lesser-known capabilities of Kubernetes.

I hope this blog post has been helpful.

## Sorting and Organizing Your Pods 📋

Ever wished you could organize your pod list in a more meaningful way? With Kubernetes, you can! Simply use the `--sort-by` flag along with the `kubectl get pods` command to sort your pods by various criteria, such as pod name or creation time.

Running `kubectl get pods --sort-by=.metadata.name` might just save you from endless scrolling through your pod list. Let's sort the pods in descending order, i.e., with the newest pods appearing first:

```shell
kubectl get pods --sort-by=.metadata.creationTimestamp --no-headers | tail -r
ubuntu-pod-3             2/2     Running   0          5m17s
ubuntu-pod-2             2/2     Running   0          13m7s
ubuntu-pod-1             2/2     Running   0          26m
```

## Listing All Object Types 📜

Did you know you can list all the object types that your cluster supports? Use the `kubectl api-resources` command:

```shell
kubectl api-resources
```

When we want a more encompassing list of all resources in a namespace, we can combine the `kubectl api-resources` command with `kubectl get`:

```shell
kubectl api-resources --verbs=list --namespaced -o name | xargs -n 1 kubectl get --ignore-not-found --show-kind -n <namespace>
```

`kubectl api-resources --verbs=list --namespaced -o name` retrieves all namespaced API resource types that support the list API verb. Then it outputs their names. Those names are then redirected to `xargs` as standard input.

[`xargs -n 1`](https://www.baeldung.com/linux/xargs-multiple-arguments) singly passes each of those names as initial arguments to `kubectl get --ignore-not-found --show-kind -n <namespace>`. Then, the `kubectl get` command returns a list of resources belonging to each resource type in the specified namespace.

## Default Resources and Limits with LimitRange and ResourceQuotas 🚦

In Kubernetes, namespaces provide a mechanism for isolating groups of resources within a single cluster. Namespaces are a way to divide cluster resources into groups for multiple users (via resource-quota). Each namespace will have one or multiple containers running inside it.

After creating a namespace for each team within the cluster, consider that what if one team, i.e., namespace, consumes more resources from the cluster like CPU and memory, and other teams' resources starve for resources as the cluster has a very limited amount of available hardware resources. This creates a noisy neighbor problem within the cluster.

To avoid this, as an administrator, first, you create a namespace within the cluster, and then you can use ResourceQuota and LimitRange to assign resource quotas on namespaces and set limits for containers running inside any namespace.

### Resource Quotas

After creating namespaces, we can use the ResourceQuota object to limit the total amount of resources used by the namespace. We can use ResourceQuota to set limits for different object types that can be created within a namespace along with setting quotas for resources like CPU and memory.

A ResourceQuota for setting a quota on resources looks like this:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
    name: teamx-resource-quota
    namespace: teamx
spec:
    hard:
        limits.cpu: 150m
        limits.memory: 600Mi
        requests.cpu: 150m
        requests.memory: 600Mi
```

- `limits.cpu` is the maximum CPU limit for all the containers in the Namespace, i.e., the entire namespace.
- `limits.memory` is the maximum Memory limit for all containers in the Namespace, i.e., the entire namespace.
- `requests.cpu` is the maximum CPU requests for all the containers in the Namespace. As per the above YAML, the total requested CPU in the Namespace should be less than 150m.
- `requests.memory` is the maximum Memory requests for all the containers in the Namespace. As per the above YAML, the total requested memory in the namespace should be less than 600Mi.

### LimitRange for Containers

We can create a LimitRange object in our Namespace which can be used to set limits on resources on containers running within the namespace. This is used to provide default limit values for Pods which do not specify this value themselves to equally distribute resources within a namespace.

A LimitRange provides constraints that can:

- Apply minimum and maximum CPU resources usage limit per Pod or Container in a namespace.
- Apply minimum and maximum memory request limit per PersistentVolumeClaim in a namespace.
- Apply minimum and maximum CPU resources usage limit per Pod or Container in a namespace.
- Set default request/limit for resources within a namespace and then automatically set the limits to Containers at runtime.

```yaml
apiVersion: v1
kind: LimitRange
metadata:
    name: teamx-limit-range
spec:
    limits:
    - default:
            memory: 200Mi
            cpu: 50m
        defaultRequest:
            memory: 200Mi
            cpu: 50m
        max:
            memory: 200Mi
            cpu: 50m
        min:
            memory: 200Mi
            cpu: 50m
        type: Container
```

The above YAML file has 4 sections: `max`, `min`, `default`, and `defaultRequest`.

- The `default` section will set up the default limits for a container in a pod. Any container with no limits defined will get these values assigned as default.
- The `defaultRequest` section will set up the default requests for a container in a pod. Any container with no requests defined will get these values assigned as default.
- The `max` section will set up the maximum limits that a container in a Pod can set. The value specified in the `default` section cannot be higher than this value.
- The `min` section will set up the minimum requests that a container in a Pod can set. The value specified in the `defaultRequest` section cannot be lower than this value.

## kubectl debug

One of the most forgotten but powerful `kubectl` commands is `debug`. It allows you to create a sidecar container on any pod, copy a pod to a new instance for debugging, and even access the pod's filesystem.

### Debugging a Node 🖥️

Use the `kubectl debug node` command to deploy a Pod to a Node that you want to troubleshoot. This command is helpful in scenarios where you can't access your Node by using an SSH connection. When the Pod is created, the Pod opens an interactive shell on the Node. To create an interactive shell on a Node named `mynode`, run:

```shell
kubectl debug node/mynode -ti --image=ubuntu -- chroot /host bash
```

### Adding Ephemeral Containers 🐳

You can also use the `kubectl debug` command to add ephemeral containers to a running Pod for debugging.

First, create a pod for the example:

```shell
kubectl run ephemeral-demo --image=registry.k8s.io/pause:3.1 --restart=Never
```

The examples in this section use the [pause container image](https://registry.k8s.io/pause:3.1) because it does not contain debugging utilities, but this method works with all container images. If you attempt to use `kubectl exec` to create a shell, you will see an error because there is no shell in this container image.

```shell
kubectl exec -it ephemeral-demo -- sh
OCI runtime exec failed: exec failed: container_linux.go:346: starting container process caused "exec: \"sh\": executable file not found in $PATH": unknown
```

You can instead add a debugging container using `kubectl debug`. If you specify the `-i/--interactive` argument, `kubectl` will automatically attach to the console of the Ephemeral Container.

```shell
kubectl debug -it ephemeral-demo --image=busybox:1.28 --target=ephemeral-demo
Defaulting debug container name to debugger-8xzrl.
If you don't see a command prompt, try pressing enter.
/ #
```

This command adds a new `busybox` container and attaches to it. The `--target` parameter targets the process namespace of another container. It's necessary here because `kubectl run` does not enable process namespace sharing in the pod it creates.

## Krew: The Plugin Marketplace 🚀

There's a massive marketplace of Kubectl plugins that can extend its functionality and make your life easier. Meet [Krew](https://krew.sigs.k8s.io/docs/user-guide/setup/install/):

Krew is the plugin manager for the `kubectl` command-line tool.

Krew helps you:

- Discover [kubectl plugins](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/),
- Install them on your machine,
- And keep the installed plugins up-to-date.

There are 225 kubectl plugins currently distributed on Krew. Krew works across all major platforms, like macOS, Linux, and Windows.

## Prow: CI/CD for Kubernetes ⚙️

Kubernetes' Project CI/CD is powered by [Prow](http://prow.k8s.io), an open-source CI system that can scale to hundreds of thousands of jobs.

The Kubernetes Testing SIG describes Prow as "a CI/CD system built on Kubernetes for Kubernetes that executes jobs for building, testing, publishing, and deploying." However, that description does not highlight perhaps the most important inferred capability of Prow — a capability that is at the heart of best-of-breed CI/CD automation tools — that capability is automation that starts with code commits. In the case of Prow, it starts with a scalable stateless microservice called [hook](https://github.com/kubernetes/test-infra/blob/master/prow/cmd/README.md#core-components) that triggers native K8s CI/CD jobs (among a number of things that hook does via [plugins](https://github.com/kubernetes/test-infra/tree/master/prow/plugins)).

It is this GitHub automation capability that has been one of the key reasons why other K8s projects have adopted Prow for their own CI/CD. But Prow is more than just GitHub webhook automation and CI/CD job execution. Prow is also:

- **Comprehensive GitHub Automation**
- **ChatOps** [via simple /foo commands](https://prow.k8s.io/command-help)
- **Fine-grained GitHub policy and permission management** via [OWNERS files](https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md)
- **GitHub PR/merge automation** — [tide](https://github.com/kubernetes/test-infra/tree/master/prow/cmd/tide)
- **GitHub API request cache** to minimize the impact of GitHub API limits — [ghProxy](https://github.com/kubernetes/test-infra/tree/master/ghproxy)
- **GitHub Organization and repository membership and permissions management** — [peribolos](https://github.com/kubernetes/test-infra/tree/master/prow/cmd/peribolos)
- **GitHub labels management** — [label plugin](https://github.com/kubernetes/test-infra/tree/master/prow/plugins/label)
- **GitHub branch protection configuration** — [branchprotector](https://github.com/kubernetes/test-infra/tree/master/prow/cmd/branchprotector)
- **GitHub release notes management** — [releasenote](https://github.com/kubernetes/test-infra/tree/master/prow/plugins/releasenote)
- **Scalable, cacheable** [GitHub API cache](https://github.com/kubernetes/test-infra/blob/master/prow/scaling.md#github-api-cache)
- **GitHub bot** with [Prow's bot being an active GitHub user since 2016](https://github.com/k8s-ci-robot)
- **Multi-engine CI/CD Job Execution** — [plank](https://github.com/kubernetes/test-infra/tree/master/prow/cmd/plank)
- **CI/CD Reporting** — [crier](https://github.com/kubernetes/test-infra/tree/master/prow/cmd/crier)
- **CI/CD Dashboards** for viewing job history, merge status, and more — [deck](https://github.com/kubernetes/test-infra/tree/master/prow/cmd/deck)
- **Pluggable Artifact Viewer** — [Spyglass](https://github.com/kubernetes/test-infra/tree/master/prow/spyglass)
- **Prometheus Metrics** for monitoring and alerting — [metrics](https://github.com/kubernetes/test-infra/tree/master/prow/metrics)
- **Config-as-Code for Its Own Configuration** — [updateconfig](https://github.com/kubernetes/test-infra/tree/master/prow/plugins/updateconfig)

And I am sure I am still missing a bunch of things — like [cats](https://github.com/kubernetes/test-infra/tree/master/prow/plugins/cat) and [dogs](https://github.com/kubernetes/test-infra/tree/master/prow/plugins/dog).

## Extending Kubernetes API 🚀

Did you know you can extend the Kubernetes API itself? Meet the [Kubernetes API Aggregator Layer](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/apiserver-aggregation/), a powerful tool for introducing subresources or aggregating them, like the custom metrics server.

The aggregation layer enables installing additional Kubernetes-style APIs in your cluster. These can either be pre-built, existing 3rd party solutions, such as [service-catalog](https://github.com/kubernetes-incubator/service-catalog/blob/master/README.md), or user-created APIs like [apiserver-builder](https://github.com/kubernetes-incubator/apiserver-builder/blob/master/README.md), which can get you started.

## Auto-Provisioning Namespaces 🛠️

There's an easy way to auto-provision namespaces without giving extra permissions to your users. Use the [NamespaceAutoProvision Admission controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#namespaceautoprovision).

This admission controller examines all incoming requests on namespaced resources and checks if the referenced namespace exists. It creates a namespace if it cannot be found. This admission controller is useful in deployments that do not want to restrict the creation of a namespace prior to its usage.

## Enforcing Custom Rules

Kubernetes offers a simple way to intercept and validate requests with ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks.

[This](https://github.com/slackhq/simple-kubernetes-webhook) is a simple [Kubernetes admission webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/). It is meant to be used as a validating and mutating admission webhook only and does not support any controller logic.

It has been developed as a simple Go web service without using any framework or `boilerplate` such as `kubebuilder`.

This project is aimed at illustrating how to build a fully functioning admission webhook in the simplest way possible. Most existing examples found on the web rely on heavy machinery using powerful frameworks, yet fail to illustrate how to implement a lightweight webhook that can do much-needed actions such as rejecting a pod for compliance reasons or injecting helpful environment variables.

## Dynamic Resource Allocation 🚀

Allocate resources outside your cluster with Dynamic [Resource Allocation](https://kubernetes.io/blog/2022/12/15/dynamic-resource-allocation/). Since K8s v1.26, use **ResourceClass** and **ResourceClaims** to extend offerings beyond the cluster.

In contrast to native resources (such as CPU or RAM) and [extended resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#extended-resources) (managed by a device plugin, advertised by kubelet), the scheduler has no knowledge of what dynamic resources are available in a cluster or how they could be split up to satisfy the requirements of a specific ResourceClaim. Resource drivers are responsible for that.

Drivers mark **ResourceClaims** as allocated once resources for it are reserved. This also then tells the scheduler where in the cluster a claimed resource is actually available.

**ResourceClaims** can get resources allocated as soon as the ResourceClaim is created (immediate allocation), without considering which Pods will use the resource. The default (wait for first consumer) is to delay allocation until a Pod that relies on the ResourceClaim becomes eligible for scheduling. This design with two allocation options is similar to how Kubernetes handles storage provisioning with PersistentVolumes and PersistentVolumeClaims.

## Managing Requests in the Kubernetes API 📜

In Kubernetes, request queue management is handled by [API Priority and Fairness (APF)](https://kubernetes.io/docs/concepts/cluster-administration/flow-control). It is enabled by default in Kubernetes 1.20 and beyond. The API server also provides two parameters, `--max-requests-inflight` (default is 400) and `--max-mutating-requests-inflight` (default is 200), for limiting the number of requests. If APF is enabled, both of these parameters are summed up — and that's how the API server's total concurrency limit is defined.

That said, there are some finer details to account for:
- Long-running API requests (e.g., viewing logs or executing commands in a pod) are not subject to APF limits, and neither are WATCH requests.
- There is also a special predefined priority level called exempt. Requests from this level are processed immediately.

So you can fine-tune how the Kubernetes API server queues and handles requests to prioritize essential requests and manage latency effectively.

### API Priority with `kubectl`

You can explore how busy your Kubernetes API server is by examining the Priority Level queue. With the APIPriorityAndFairness feature enabled, the kube-apiserver serves the following additional paths at its HTTP(S) ports. You need to ensure you have permissions to access these endpoints. You don't have to do anything if you are using admin. Permissions can be granted if needed following the RBAC doc to access `/debug/api_priority_and_fairness/` by specifying nonResourceURLs.

- `/debug/api_priority_and_fairness/dump_priority_levels` - a listing of all the priority levels and the current state of each. You can fetch like this:
    ```shell
    kubectl get --raw /debug/api_priority_and_fairness/dump_priority_levels
    ```
    The output will be in CSV and similar to this:
    ```
    PriorityLevelName, ActiveQueues, IsIdle, IsQuiescing, WaitingRequests, ExecutingRequests, DispatchedRequests, RejectedRequests, TimedoutRequests, CancelledRequests
    catch-all,         0,            true,   false,       0,               0,                 1,                  0,                0,                0
    exempt,            0,            true,   false,       0,               0,                 0,                  0,                0,                0
    global-default,    0,            true,   false,       0,               0,                 46,                 0,                0,                0
    leader-election,   0,            true,   false,       0,               0,                 4,                  0,                0,                0
    node-high,         0,            true,   false,       0,               0,                 34,                 0,                0,                0
    system,            0,            true,   false,       0,               0,                 48,                 0,                0,                0
    workload-high,     0,            true,   false,       0,               0,                 500,                0,                0,                0
    workload-low,      0,            true,   false,       0,               0,                 0,                  0,                0,                0
    ```

- `/debug/api_priority_and_fairness/dump_queues` - a listing of all the queues and their current state. You can fetch like this:
    ```shell
    kubectl get --raw /debug/api_priority_and_fairness/dump_queues
    ```
    The output will be in CSV and similar to this:
    ```
    PriorityLevelName, Index,  PendingRequests, ExecutingRequests, SeatsInUse, NextDispatchR,   InitialSeatsSum, MaxSeatsSum, TotalWorkSum
    workload-low,      14,     27,              0,                 0,          77.64342019ss,   270,             270,         0.81000000ss
    workload-low,      74,     26,              0,                 0,          76.95387841ss,   260,             260,         0.78000000ss
    ...
    leader-election,   0,      0,               0,                 0,          5088.87053833ss, 0,               0,           0.00000000ss
    leader-election,   1,      0,               0,                 0,          0.00000000ss,    0,               0,           0.00000000ss
    ...
    workload-high,     0,      0,               0,                 0,          0.00000000ss,    0,               0,           0.00000000ss
    workload-high,     1,      0,               0,                 0,          1119.44936475ss, 0,               0,           0.00000000ss
    ```

- `/debug/api_priority_and_fairness/dump_requests` - a listing of all the requests including requests waiting in a queue and requests being executed. You can fetch like this:

    ```shell
    kubectl get --raw /debug/api_priority_and_fairness/dump_requests
    ```

    The output will be in CSV and similar to this:

    ```shell
    PriorityLevelName, FlowSchemaName,   QueueIndex, RequestIndexInQueue, FlowDistingsher,                        ArriveTime,                     InitialSeats, FinalSeats, AdditionalLatency, StartTime
    exempt,            exempt,           -1,         -1,                  ,                                       2023-07-15T04:51:25.596404345Z, 1,            0,          0s,                2023-07-15T04:51:25.596404345Z
    workload-low,      service-accounts, 14,         0,                   system:serviceaccount:default:loadtest, 2023-07-18T00:12:51.386556253Z, 10,           0,          0s,                0001-01-01T00:00:00Z
    workload-low,      service-accounts, 14,         1,                   system:serviceaccount:default:loadtest, 2023-07-18T00:12:51.487092539Z, 10,           0,          0s,                0001-01-01T00:00:00Z
    ```

## Manually Triggering Pod Evictions 🚨

A safer alternative to deleting pods is using evictions, because they respect pod disruption budgets and other termination policies. You can manually trigger a pod eviction using the Kubernetes eviction API.

Create a file called `eviction.json` with content similar to this:

```json
{
    "apiVersion": "policy/v1",
    "kind": "Eviction",
    "metadata": {
        "name": "pod-name-here",
        "namespace": "default"
    }
}
```

And run this command:

```shell
curl -v -H 'Content-type: application/json' https://your-cluster-api-endpoint.example/api/v1/namespaces/default/pods/pod-name-here/eviction -d @eviction.json
```

## Pod Overhead 🏋️‍♂️

When you run a Pod on a Node, the Pod itself takes an amount of system resources. These resources are additional to the resources needed to run the container(s) inside the Pod. In Kubernetes, Pod Overhead is a way to account for the resources consumed by the Pod infrastructure on top of the container requests & limits.

In Kubernetes, the Pod's overhead is set at [admission](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#what-are-admission-webhooks) time according to the overhead associated with the Pod's [RuntimeClass](https://kubernetes.io/docs/concepts/containers/runtime-class/).

A pod's overhead is considered in addition to the sum of container resource requests when scheduling a Pod. Similarly, the kubelet will include the Pod overhead when sizing the Pod cgroup, and when carrying out Pod eviction ranking. You need to make sure a RuntimeClass is utilized which defines the overhead field.

To work with Pod overhead, you need a RuntimeClass that defines the overhead field. As an example, you could use the following RuntimeClass definition with a virtualization container runtime that uses around 120MiB per Pod for the virtual machine and the guest OS:

```yaml
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
    name: kata-fc
handler: kata-fc
overhead:
    podFixed:
        memory: "120Mi"
        cpu: "250m"
```

Workloads which are created which specify the kata-fc RuntimeClass handler will take the memory and cpu overheads into account for resource quota calculations, node scheduling, as well as Pod cgroup sizing.

Consider running the given example workload, `test-pod`:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: test-pod
spec:
    runtimeClassName: kata-fc
    containers:
    - name: busybox-ctr
        image: busybox:1.28
        stdin: true
        tty: true
        resources:
            limits:
                cpu: 500m
                memory: 100Mi
    - name: nginx-ctr
        image: nginx
        resources:
            limits:
                cpu: 1500m
                memory: 100Mi
```

At admission time the RuntimeClass admission controller updates the workload's PodSpec to include the overhead as described in the RuntimeClass. If the PodSpec already has this field defined, the Pod will be rejected. In the given example, since only the RuntimeClass name is specified, the admission controller mutates the Pod to include an overhead.

After the RuntimeClass admission controller has made modifications, you can check the updated Pod overhead value:

```shell
kubectl get pod test-pod -o jsonpath='{.spec.overhead}'
```

The output is:

```json
map[cpu:250m memory:120Mi]
```

## Future Enhancements 🔮

All the future enhancements to the Kubernetes-adjacent projects are publicly available and maintained in git. You can find it [here](https://github.com/kubernetes/enhancements/tree/master/keps). If you have any good idea (and the resources to make it a reality), you can even submit your own!

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
