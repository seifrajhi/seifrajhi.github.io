---
id: 7d079901b358ee94eb8678be
path: "/blog/kubernetes-storage-deep-dive/"
date: "2024-10-28 10:20:00"
published: true
title: "Understanding storage in Kubernetes 💾"
cover: "./storage-cover.png"
excerpt: "Explore the intricacies of storage in Kubernetes, including types, configurations, and best practices for managing data in containerized environments."
keywords:
  - Kubernetes
  - storage
  - persistent volumes
  - k8s
  - container orchestration
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **A Deep Dive into Kubernetes Storage 💿**

## 🗯 Introduction

Managing data within Kubernetes pods can be challenging, as pods are temporary and any data stored within them is lost when they're deleted or restarted. To address this, Kubernetes offers persistent storage options such as Persistent Volumes (PVs) and Persistent Volume Claims (PVCs).

In this beginner's guide, we'll explore the key concepts of Kubernetes storage, including PVs, PVCs, and StorageClass.

We'll explain how to provision persistent volumes, the differences between static and dynamic provisioning, and how StorageClass defines the provisioner, parameters, and reclaim policy for dynamically provisioned PVs.

![alt text](image-2.png)

## 📦 Kubernetes Storage Basics

![alt text](image.png)

Kubernetes storage is based on the concepts of volumes: there are ephemeral volumes that are often simply called volumes and there are Persistent Volumes that are meant for long-term storage.

In Kubernetes, pods are temporary and any data stored within them is lost when they're deleted or restarted. To avoid this, use persistent storage options such as PVs (Persistent Volumes) and PVCs (Persistent Volume Claims). PVs are storage resources with an independent lifecycle, while PVCs are storage requests. Use them for simplified storage management and scaling. Provisioning persistent volumes can be static or dynamic. StorageClass defines the provisioner, parameters, and reclaim policy for dynamically provisioned PVs.

![storage](./storage.png)

In Kubernetes, Pods are the smallest units that can be deployed. They can contain one or more containers, each with its own storage requirements. However, Pods are temporary and ephemeral, and any data stored within a Pod is lost when the Pod is deleted or restarted. To prevent such data loss, it is important to use persistent storage options that enable data to be stored outside of a pod so that it persists beyond the lifetime of a Pod.

## 🗂 Volumes and Mount

In Kubernetes, a volume is a directory that is accessible to containers in a pod. Volumes provide a way for containers to store and access data, and they can be used to share data between containers in the same pod.

### 📄 Manifest File

To use a volume in a Pod, you need to specify the volume in the Pod's YAML file using the `spec.volumes` field and then mount it to a directory within the container's file system using the `spec.containers[*].volumeMounts` field.

![manif](./pod-pv.png)

**volumes and mountpod.yaml:**

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: myapp
spec:
    containers:
        - name: myapp-container
            image: myapp-image
            volumeMounts:
                - name: data-volume
                    mountPath: /data
    volumes:
        - name: data-volume
            hostPath:
                path: /mnt/data
```

In this example, the `spec.volumes` field is used to define a `hostPath` volume named `data-volume`. The `hostPath` field specifies the directory on the host where the data will be stored. The `spec.containers[*].volumeMounts` field is then used to mount the `data-volume` volume to a directory within the container's file system. In this case, the `data-volume` volume is mounted to the `/data` directory within the container. This configuration allows the container to write data to the `/mnt/data` directory on the host, which will be persisted even if the Pod is deleted or restarted.

### ⚠️ Drawbacks

![Drawbacks](./Drawbacks.png)

Volumes can add complexity to applications because they require separate management of storage requirements for each Pod. Updating storage requirements for a Pod requires modifying the pod definition file and redeploying, which can be time-consuming and error-prone.

## 📂 Persistent Volumes (PVs) and Persistent Volume Claims (PVCs)

A Persistent Volume (PV) in Kubernetes is a storage resource provisioned in the cluster. It has an independent lifecycle from the Pod that uses it, allowing data to persist even if the Pod is deleted. PVs can be physical disks or cloud-based storage resources like Amazon EBS volumes.

A Persistent Volume Claim (PVC) is a request for storage by a user. Users can make PVC requests without having to know the details of where the storage is coming from. The Kubernetes control plane then finds an available PV that meets the claim's requirements and binds the claim to the PV. The relationship between PV and PVC in Kubernetes is one-to-one. Once a PVC is bound to a PV, no other PVC can bind to that same PV.

![pvc](./pvcs.png)

By using PVs and PVCs, storage management and scaling in Kubernetes are simplified. Admins can manage PVs independently of Pods, enabling them to provision, resize, and delete storage resources without impacting the Pods. Meanwhile, PVCs let users request specific storage amounts without requiring knowledge of the underlying storage system.

### 📄 Manifest File

![pvc-manifest](./pvc-manifest.png)

**pv.yaml:**

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
    name: my-pv
spec:
    capacity:
        storage: 5Gi
    accessModes:
        - ReadWriteOnce
    persistentVolumeReclaimPolicy: Retain
    hostPath:
        path: /mnt/data
```

Define a PV named `my-pv` with a storage capacity of 5Gi and `hostPath` set to `/mnt/data`.

There are three available options for `persistentVolumeReclaimPolicy`:
- **Retain:** The PV's storage is not deleted when the PVC is deleted, allowing manual recovery of data.
- **Delete:** The PV's storage is deleted when the PVC is deleted.
- **Recycle:** The PV's storage is formatted and made available for use by a new PVC.

**pvc.yaml:**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: my-pvc
spec:
    accessModes:
        - ReadWriteOnce
    resources:
        requests:
            storage: 5Gi
```

Create a PVC named `my-pvc` that requests 5Gi of storage.

There are three types of Access Modes available in Kubernetes:
1. **ReadWriteOnce (RWO):** This mode allows the volume to be mounted as read-write by a single node.
2. **ReadOnlyMany (ROX):** This mode allows the volume to be mounted as read-only by multiple nodes.
3. **ReadWriteMany (RWX):** This mode allows the volume to be mounted as read-write by multiple nodes.

**pod.yaml:**

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: my-pod
spec:
    containers:
        - name: my-container
            image: nginx
            volumeMounts:
                - name: my-volume
                    mountPath: /data
    volumes:
        - name: my-volume
            persistentVolumeClaim:
                claimName: my-pvc
```

The Pod has one volume named `my-volume`, which is created using a PVC named `my-pvc`. The PVC specifies the `claimName` field to request storage from a Persistent Volume (PV) that matches the storage requirements. The volume is then mounted to the container's file system using the `volumeMounts` field. The `volumeMounts` field specifies that the `my-volume` volume should be mounted at the directory `/data` within the container.

## 📈 Provision Persistent Volumes

![alt text](image-1.png)

In Kubernetes, there are two ways to provision volumes: static and dynamic.

![static](./static.png)

### Static Provisioning

Static provisioning involves the cluster administrator creating a set of Persistent Volumes (PVs) with predefined storage types for use by developers. It is ideal for organizations with predictable storage needs or shared storage across multiple teams or applications.

### Dynamic Provisioning

Dynamic provisioning automatically provisions storage when a Persistent Volume Claim (PVC) is created using a StorageClass that defines the required storage type. This method eliminates the need for administrators to manage PVs manually and is suitable for organizations with unpredictable storage needs or requiring more flexibility in their storage options.

### 🏷️ Storage Classes

In Kubernetes, a StorageClass is an object that defines the provisioner, parameters, and reclaim policy for dynamically provisioned Persistent Volumes (PVs). A StorageClass provides a way for administrators to define storage profiles with different performance characteristics or backend storage providers.

StorageClasses enable dynamic provisioning of storage volumes, meaning that when a user creates a Persistent Volume Claim (PVC), a volume is automatically provisioned for them based on the StorageClass's parameters. It simplifies storage management and provides greater flexibility and efficiency in managing storage resources in Kubernetes.

![dynamic](./dynamic.png)

### 📄 Manifest File

**storage-class.yaml:**

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
    name: fast
provisioner: kubernetes.io/gce-pd
parameters:
    type: pd-ssd
```

Define a provisioner and storage parameters to create the PV on-demand when a PVC is requested.

**pvc.yaml:**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: my-pvc
spec:
    accessModes:
        - ReadWriteOnce
    resources:
        requests:
            storage: 5Gi
    storageClassName: fast
```

Request a PVC with a specific storage size and accessModes, and specifies the `storageClassName` that matches the StorageClass name in `storage-class.yaml`.

**pod.yaml:**

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: my-pod
spec:
    containers:
        - name: my-container
            image: nginx
            volumeMounts:
                - name: my-volume
                    mountPath: /data
    volumes:
        - name: my-volume
            persistentVolumeClaim:
                claimName: my-pvc
```

Use the `persistentVolumeClaim` field to reference the PVC by name.

### 🔍 Short Name

```shell
$ kubectl api-resources
NAME                   SHORTNAMES APIVERSION        NAMESPACED KIND
persistentvolumeclaims pvc        v1                true       PersistentVolumeClaim
persistentvolumes      pv         v1                false      PersistentVolume
storageclasses         sc         storage.k8s.io/v1 false      StorageClass
```

![concepts](./concepts.png)
<div class="image-title"><a href="https://schoolofdevops.com/">Source</a></div>

## 📘 Conclusion

Persistent storage solutions in Kubernetes, especially with the introduction of CSI, have made production-grade containerized stateful workloads a reality. Also, with Kubernetes' operator framework - block-level synchronous replication, plugin-based backup-and-restore, and data migration have been added on to the toolchain.

## Some Further Reading

[Container Storage Interface (CSI)](https://kubernetes.io/blog/2019/01/15/container-storage-interface-ga/)

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
