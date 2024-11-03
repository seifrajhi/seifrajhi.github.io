---
id: 756800f3b0431ff2663d7cef
path: "/blog/k8s-dynamic-resource-allocation-dra/"
date: "2024-11-02 14:00:00"
published: true
title: "Dynamic Resource Allocation in Kubernetes"
cover: "./dra.png"
excerpt: "An in-depth look at Dynamic Resource Allocation (DRA) in Kubernetes and its importance in modern environments"
keywords:
  - Dynamic Resource Allocation
  - Kubernetes
  - k8s
  - Resource Management
coverCredits: 'Photo by Saifeddine Rajhi'
---
> **Dynamic Resource Allocation (DRA) in Kubernetes**

## 📚 Introduction

Dynamic Resource Allocation (DRA) is a new API for requesting resources in Kubernetes, introduced to enable networking technologies. This blog post explores the concept of DRA, its importance, and how it enhances resource management in Kubernetes.

## What is Dynamic Resource Allocation (DRA)?

Dynamic Resource Allocation (DRA) is a new API for requesting resources in Kubernetes, allowing for more flexible and efficient allocation of resources such as GPUs or network devices to workloads.

## Why is there a need for Device Plugins in Kubernetes?

Device Plugins are needed in Kubernetes because Kubernetes does not natively support specialized hardware like GPUs or network interfaces. Device Plugins help to utilize these resources within Kubernetes workloads.

## Limitations of the Device Plugin Framework

The Device Plugin framework has limitations such as not supporting shared resources, difficulty in handling unlimited resources, and a lack of support for advanced configurations for different instances of the same resource.

## How DRA Solves Device Plugin Framework Issues

DRA solves the issues with the Device Plugin framework by providing a more flexible and vendor-controlled approach to resource allocation, allowing for shared resources, no requirement for pre-defining resource limits, and advanced configurations for each resource instance.

## 💾 Storage Options in Kubernetes

Storage options in Kubernetes include scratch space for temporary data and persistent storage solutions like NFS mounts and CSI (Container Storage Interface).

## 🔌 Device Plugins and Their Constraints

Device plugins are necessary for utilizing specialized hardware within Kubernetes, but they have constraints that DRA aims to overcome.

## 🔄 Key Concepts in DRA

The Array API introduces concepts like **DeviceClass**, **ResourceClaim**, **ResourceClaimTemplates**, and **ResourceSlice**, providing more control and flexibility.

### DeviceClass

A `DeviceClass` defines the characteristics of a device. It specifies the driver and parameters for a device, providing a structured way to request resources. Here is an example of a `DeviceClass`:

```yaml
apiVersion: resource.k8s.io/v1alpha3
kind: DeviceClass
metadata:
  name: device.com
spec:
  selectors:
  - cel:
      expression: device.driver == "device.com"
```

### ResourceClaim

A `ResourceClaim` is analogous to a Persistent Volume Claim (PVC) but for device resources. It is a request for a specific type of resource and is used to allocate resources to a pod. Here is an example of a `ResourceClaim`:

```yaml
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceClaim
metadata:
  name: claim1
spec:
  devices:
    requests:
    - name: gpu
      deviceClassName: device.com
```

### ResourceClaimTemplate

A `ResourceClaimTemplate` is used to generate `ResourceClaim` objects. When a pod references a `ResourceClaimTemplate`, a new `ResourceClaim` is generated for each entry in the pod spec's `resourceClaims` section. Here is an example of a `ResourceClaimTemplate`:

```yaml
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceClaimTemplate
metadata:
  name: claim1
spec:
  spec:
    devices:
      requests:
      - name: gpu
        deviceClassName: device.com
```

### ResourceSlice

A `ResourceSlice` represents a slice of resources available on a node. It is used to manage and allocate resources to `ResourceClaims`. Here is an example of a `ResourceSlice`:

```yaml
apiVersion: resource.k8s.io/v1alpha3
kind: ResourceSlice
metadata:
  name: slice1
spec:
  devices:
  - basic:
      attributes:
        family:
          string: Arc
        model:
          string: A770
      capacity:
        memory: 16288Mi
        millicores: 1k
    name: 0000-03-00-0-0x56a0
  driver: device.com
  nodeName: node1
  pool:
    generation: 0
    name: pool1
    resourceSliceCount: 1
```

Here is an example of a pod specification that uses Dynamic Resource Allocation (DRA):

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-claim
spec:
  restartPolicy: Never
  containers:
  - name: with-resource
    image: xxxxx
  resourceClaims:
  - name: resource
    resourceClaimName: zzzz
```

In this example:

- The pod is named `test-claim`.
- It has a single container named `with-resource` that uses the specified image.
- The pod references a `ResourceClaim` named `zzzz` through the `resourceClaims` field, ensuring that the required resources are allocated and available for the pod.

## 📝 Allocation Process in DRA

The allocation process in DRA can occur immediately or be delayed until a pod referencing the resource claim is created, influencing pod scheduling.

## 🛠️ Implementing a DRA Driver

Implementing a DRA driver involves defining a name, CRDs, coordination mechanisms, and providing implementations for the controller and node plugin.

## Resource Drivers

In the context of Dynamic Resource Allocation (DRA) in Kubernetes, a **resource driver** is a component that manages the allocation and deallocation of specific types of resources, such as GPUs, network devices, or other specialized hardware. The resource driver is responsible for:

1. **Discovery**: Identifying and reporting the available resources on each node in the Kubernetes cluster.
2. **Allocation**: Handling requests for resources from pods and allocating the appropriate resources to meet those requests.
3. **Preparation**: Preparing the allocated resources for use by the pods, which may involve configuring the hardware or setting up necessary software components.
4. **Unpreparation**: Cleaning up and releasing the resources when they are no longer needed by the pods.

The resource driver typically consists of two main components:

1. **Controller**: A centralized component that coordinates with the Kubernetes scheduler to decide which nodes can service incoming resource claims. It handles the creation and management of `ResourceClaim` and `ResourceSlice` objects.
2. **Node Plugin**: A daemon running on each node that interacts with the hardware to perform discovery, allocation, preparation, and unpreparation of resources. It reports the available resources to the controller and ensures that the resources are correctly configured for use by the pods.

The resource driver uses Custom Resource Definitions (CRDs) such as `ResourceClass`, `ResourceClaim`, `ResourceClaimTemplate`, and `ResourceSlice` to define and manage the resources within the Kubernetes cluster. These CRDs provide a standardized way to request, allocate, and manage resources, enabling more flexible and efficient resource management.

## 🔗 Container Device Interface (CDI)

**CDI (Container Device Interface)** is a specification for exposing devices to containers, which is utilized by container runtimes like containerd and CRI-O. It introduces an abstract notion of a device as a resource. Such devices are uniquely specified by a fully-qualified name that is constructed from a vendor ID, a device class, and a name that is unique per vendor ID-device class pair.

## Requirements

- Kubernetes 1.31+, with `DynamicResourceAllocation` feature-flag enabled, and other cluster parameters
- Container runtime needs to support CDI:
  - CRI-O v1.23.0 or newer
  - Containerd v1.7 or newer

### Enable CDI in Containerd

Containerd has CDI enabled by default since version 2.0. For older versions (1.7 and above) CDI has to be enabled in Containerd config by enabling `enable_cdi` and `cdi_specs_dir`. Example `/etc/containerd/config.toml`:

```toml
version = 2
[plugins]
  [plugins."io.containerd.grpc.v1.cri"]
    enable_cdi = true
    cdi_specs_dir = ["/etc/cdi", "/var/run/cdi"]
```

## Limitations

- Currently max 640 GPUs can be requested for one resource claim (10 PCIe devices, each with 64 SR-IOV VFs = 640 VFs on the same node).
- v0.6.0 only supports K8s v1.31 which does not have partitionable devices support, therefore this release does not support dynamic GPU SR-IOV configuration.
- v0.6.0 does not support classic DRA and only relies on Structured Parameters DRA.
- v0.6.0 drops Alertmanager web-hook used for (experimental) GPU health management support.

## Enabling Dynamic Resource Allocation

Dynamic resource allocation is an alpha feature and only enabled when the `DynamicResourceAllocation` feature gate and the `resource.k8s.io/v1alpha3` API group are enabled. For details on that, see the `--feature-gates` and `--runtime-config` kube-apiserver parameters. kube-scheduler, kube-controller-manager, and kubelet also need the feature gate.

When a resource driver uses a control plane controller, then the `DRAControlPlaneController` feature gate has to be enabled in addition to `DynamicResourceAllocation`.

A quick check whether a Kubernetes cluster supports the feature is to list `DeviceClass` objects with:

```bash
kubectl get deviceclasses
```

If your cluster supports dynamic resource allocation, the response is either a list of `DeviceClass` objects or:

```shell
No resources found
```

If not supported, this error is printed instead:

```shell
error: the server doesn't have a resource type "deviceclasses"
```

A control plane controller is supported when it is possible to create a `ResourceClaim` where the `spec.controller` field is set. When the `DRAControlPlaneController` feature is disabled, that field automatically gets cleared when storing the `ResourceClaim`.

The default configuration of kube-scheduler enables the "DynamicResources" plugin if and only if the feature gate is enabled and when using the v1 configuration API. Custom configurations may have to be modified to include it.

In addition to enabling the feature in the cluster, a resource driver also has to be installed. Please refer to the driver's documentation for details.

### Scheduling Details

When using a control plane controller, the resource driver handles the allocation of resources in cooperation with the Kubernetes scheduler. The scheduler checks all `ResourceClaims` needed by a pod and creates a `PodSchedulingContext` object, informing the resource drivers about nodes that are considered suitable for the pod. The resource drivers respond by excluding nodes that don't have enough resources left. Once the scheduler has this information, it selects a node and stores the choice in the `PodSchedulingContext` object. The resource drivers then allocate the resources, and the pod gets scheduled. Without a control plane controller, the scheduler uses structured parameters to allocate resources directly from `ResourceSlice` objects, tracking which resources have been allocated and selecting from the remaining resources.

### Monitoring Resources

The kubelet provides a gRPC service to enable the discovery of dynamic resources for running pods. This service allows resource drivers to report the availability and status of resources on each node. The gRPC endpoints provide detailed information about the resources allocated to each pod, helping administrators monitor and manage resource usage effectively. This monitoring capability is crucial for ensuring that resources are being used efficiently and for troubleshooting any issues that may arise with resource allocation.

### Pre-scheduled Pods

When a pod is created with the `spec.nodeName` field already set, the scheduler is bypassed. If the required `ResourceClaims` for the pod do not exist, are not allocated, or are not reserved, the kubelet will fail to run the pod and periodically re-check until the requirements are fulfilled. This situation can occur due to version skew, configuration issues, or feature gate settings. The kube-controller-manager detects such scenarios and attempts to make the pod runnable by triggering the allocation and reservation of the required `ResourceClaims`. However, it is generally better to avoid bypassing the scheduler to prevent resource blocking and ensure efficient resource allocation.

## 🔗 References

- [Kubernetes](https://kubernetes.io/)
- [Container Storage Interface (CSI)](https://kubernetes-csi.github.io/docs/)
- [Container Device Interface (CDI)](https://github.com/container-orchestrated-devices/container-device-interface)
