---
id: 85258584758902d46b7ccad8
path: "/blog/data-on-kubernetes-cloudnativepg-ceph-2/"
date: "2024-10-25 13:06:00"
published: true
title: "Data on Kubernetes: Part 2 - Deploying Databases in K8s with PostgreSQL, CloudNative-PG, and Ceph Rook on Amazon EKS"
cover: "./dok2.png"
excerpt: "EKS, Databases, Cloud Native DB, CloudNative-PG, PostgreSQL, Ceph Rook"
keywords:
  - Ceph Rook
  - Kubernetes
  - PostgreSQL
  - AWS EKS
  - CloudNative-PG
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Data persistence: running PostgreSQL on Amazon EKS**

## 🎆 Introduction

[PostgreSQL](https://www.postgresql.org/), the well-known open-source [relational database](https://en.wikipedia.org/wiki/Relational_database), is a popular choice for applications demanding scalability, reliability, and ease of management.

But how can we deploy and run PostgreSQL in a Kubernetes environment to handle the stored data? 🤔

In this blog post, we'll explore how to combine [CloudNative-PG](https://github.com/cloudnative-pg/cloudnative-pg) (a PostgreSQL operator) and [Ceph Rook](https://rook.io/) (a storage orchestrator) to create a PostgreSQL cluster that scales easily, recovers from failures, and ensures data persistence — all within an [Amazon Elastic Kubernetes Service EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html).

## 💥 Databases on K8S/EKS

Running databases and query engines on Kubernetes can offer benefits, but it's important to consider the trade-offs.

### ☑️ Benefits of Running Databases on Kubernetes

- **Automated deployment**: Kubernetes simplifies deploying databases by automating the process and it aligns with DevOps practices and infrastructure as code.
- **Scaling**: Kubernetes allows automatic scaling based on workload demands.
- **Rolling updates**: It supports seamless updates without downtime.
- **Self-healing**: Kubernetes ensures high availability by automatically recovering from failures.
- **Portability**: Kubernetes provides a consistent environment across different clusters and cloud providers.
- **Cost-effectiveness**: Kubernetes optimizes resource utilization.

### ☑️ Challenges and Considerations

- **Statefulness**: Databases are stateful, and managing state in a transient environment (like Kubernetes pods) can be complex.
- **Transient pods**: Pods can restart or fail over, affecting database availability.
- **Abstractions**: Containerization introduces abstractions that impact database-specific tasks (e.g., backups, scaling).
- **DIY on VM**: Full control but more operational overhead.
- [Kubernetes: Closer to full control, but still requires careful planning](https://cloud.google.com/blog/products/databases/to-run-or-not-to-run-a-database-on-kubernetes-what-to-consider).

### ☑️ Popular Databases on Kubernetes

- **Apache Cassandra**: Scalable, distributed NoSQL database.
- **PostgreSQL**: Supports Kubernetes through operators (e.g., cnpg).
- **MySQL, MongoDB, and others**.

> [Many teams successfully run databases on Kubernetes in production, but it requires thoughtful planning and understanding of trade-offs](https://sealos.io/blog/to-run-or-not-to-run-a-database-on-kubernetes).

## 🚀 Deploying CloudNative-PG with Ceph Rook on AWS EKS

**CloudNativePG** is an open-source [Level 5 operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) designed to manage PostgreSQL workloads on any Kubernetes cluster. It simplifies the deployment, management, and recovery of PostgreSQL instances within Kubernetes. Here are some key features:

- **High availability**: CloudNativePG covers the full lifecycle of a highly available PostgreSQL database cluster with a primary/standby architecture, using native streaming replication.
- **Automated failover**: It automates tasks that a human operator would perform, including failover.
- **Data persistence**: Unlike relying on stateful sets, CloudNativePG manages persistent volume claims for storing PGDATA.
- **Declarative configuration**: It directly integrates with the Kubernetes API server, eliminating the need for an external failover management tool.
- **Cloud Native**: Built on DevOps concepts like immutable infrastructure and declarative configuration, it leverages Kubernetes for self-healing, high availability, and more.
- **Security & TLS**: Supports security contexts, encrypted TLS connections, and client authentication.
- **Monitoring**: Includes a Prometheus exporter for metrics and transparent log integration.
- **Advanced architectures**: Extend the architecture with PgBouncer or create disaster recovery clusters.

> CloudNativePG was originally developed by [EDB](https://www.enterprisedb.com/), released under the Apache License 2.0, and submitted to CNCF Sandbox in April 2022.

**Rook** is an open-source cloud-native storage orchestrator designed for Kubernetes. Its purpose is to provide a platform, framework, and support for [Ceph storage](https://docs.ceph.com/en/latest/rados/) to seamlessly integrate with Kubernetes. Here are some key points about Rook:

- **Ceph integration**: Rook enables Ceph, a distributed storage system that offers file, block, and object storage, to be deployed and managed within Kubernetes clusters.
- **Automation and management**: Rook automates the deployment, configuration, provisioning, scaling, upgrading, and monitoring of Ceph. It ensures self-managing, self-scaling, and self-healing storage services.
- **Stability and compatibility**: The status of the Ceph storage provider in Rook is stable. Upgrades between versions maintain backward compatibility.
- **CNCF project**: Rook is hosted by the Cloud Native Computing Foundation (CNCF) as a graduated-level project.

Now let's start the deployment process.

##  Hands-on Demo

First, you can get the code and clone the repo:

```shell
git clone git@github.com:seifrajhi/data-on-eks.git
```

After that, run the `deploy.sh` script which deploys an **EKS cluster** to the `eu-west-1` region.

```shell
cd distributed-databases/cloudnative-postgres/

chmod +x install.sh

./install.sh
```

Once the script ends, you can run the below command to update the local kubeconfig so we can access the Kubernetes cluster:

```shell
aws eks update-kubeconfig --name cnpg-on-eks --region eu-west-1
```

Next, you can verify if all the pods are running:

```shell
kubectl get pods -n=cnpg-system
NAME                                          READY   STATUS    RESTARTS   AGE
cnpg-on-eks-cloudnative-pg-412d5a5fd8-amuz   1/1     Running   0          11m
```

### 🏗️ Setup Rook for Storage

Rook has published the following Helm charts for the Ceph storage provider:

- [Rook Ceph Operator](https://rook.io/docs/rook/latest-release/Helm-Charts/operator-chart/): Starts the Ceph Operator, which will watch for Ceph CRs (custom resources).
- [Rook Ceph Cluster](https://rook.io/docs/rook/latest-release/Helm-Charts/ceph-cluster-chart/): Creates Ceph CRs that the operator will use to configure the cluster.

#### 📦 Rook Ceph Operator

Installs Rook to create, configure, and manage Ceph clusters on Kubernetes.

This chart bootstraps a [rook-ceph-operator](https://github.com/rook/rook) deployment on a Kubernetes cluster using the Helm package manager.

```shell
helm repo add rook-release https://charts.rook.io/release
helm install --create-namespace --namespace rook-ceph rook-ceph rook-release/rook-ceph -f values.yaml
```

For customized settings, you can check the [values.yaml](https://github.com/rook/rook/tree/release-1.14/deploy/charts/rook-ceph/values.yaml) file.

#### 🏗️ Ceph Cluster

Creates Rook resources to configure a Ceph cluster using the Helm package manager.

Before installing, review the `values.yaml` to confirm if the default settings need to be updated.

- If the operator was installed in a namespace other than `rook-ceph`, the namespace must be set in the `operatorNamespace` variable.
- Set the desired settings in the `cephClusterSpec`. [The defaults](https://github.com/rook/rook/tree/release-1.14/deploy/charts/rook-ceph-cluster/values.yaml) are only an example and not likely to apply to your cluster.
- The monitoring section should be removed from the `cephClusterSpec`, as it is specified separately in the Helm settings.
- The default values for `cephBlockPools`, `cephFileSystems`, and `CephObjectStores` will create one of each, and their corresponding storage classes.

All Ceph components now have default values for the pod resources. The resources may need to be adjusted in production clusters depending on the load. The resources can also be disabled if Ceph should not be limited (e.g., test clusters).

The below command assumes you have first created a customized `values.yaml` file:

```shell
helm install --create-namespace --namespace rook-ceph rook-ceph-cluster \
    --set operatorNamespace=rook-ceph rook-release/rook-ceph-cluster -f values.yaml
```

#### 📦 Provision Storage

Before Rook can provision storage, a [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes) and [CephBlockPool](https://rook.io/docs/rook/latest-release/CRDs/Block-Storage/ceph-block-pool-crd/) CR need to be created. This will allow Kubernetes to interoperate with Rook when provisioning persistent volumes.

Save this StorageClass definition as **storageclass.yaml**:

```yaml
---
apiVersion: ceph.rook.io/v1
kind: CephBlockPool
metadata:
  name: replicapool
  namespace: rook-ceph # namespace:cluster
spec:
  failureDomain: host
  replicated:
    size: 3
    requireSafeReplicaSize: true
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: rook-ceph-block
provisioner: rook-ceph.rbd.csi.ceph.com # csi-provisioner-name
parameters:
  clusterID: rook-ceph 
  pool: replicapool
  imageFormat: "2"
  imageFeatures: layering
  csi.storage.k8s.io/provisioner-secret-name: rook-csi-rbd-provisioner
  csi.storage.k8s.io/provisioner-secret-namespace: rook-ceph # namespace:cluster
  csi.storage.k8s.io/controller-expand-secret-name: rook-csi-rbd-provisioner
  csi.storage.k8s.io/controller-expand-secret-namespace: rook-ceph # namespace:cluster
  csi.storage.k8s.io/node-stage-secret-name: rook-csi-rbd-node
  csi.storage.k8s.io/node-stage-secret-namespace: rook-ceph # namespace:cluster
  csi.storage.k8s.io/fstype: ext4
allowVolumeExpansion: true
reclaimPolicy: Delete
```

Then apply it

```shell
kubectl apply -f storageclass.yaml
```
### 🚀 Deploy a PostgreSQL Cluster

As with any other deployment in Kubernetes, to deploy a PostgreSQL cluster you need to apply a configuration file that defines your desired Cluster. The CloudNativePG operator offers two types of bootstrapping a new database:

1. **Bootstrap an empty cluster**
2. **Bootstrap from another cluster**

In this demo, we are going to create a new empty database cluster using `initdb` flags. We will use the template below by modifying the IAM role for IRSA configuration and the S3 bucket for the backup restore process and WAL archiving.

The Terraform script has already created these resources. Use the Terraform output to extract these parameters:

```shell
terraform output
demo_backup_irsa = "arn:aws:iam::<your_account_id>:role/cnpg-on-eks-prod-irsa"
demo_s3_bucket = "xyz-cnpg-demo-bucket"
configure_kubectl = "aws eks --region eu-west-1 update-kubeconfig --name cnpg-on-eks"
```

- **IRSA Configuration**: `arn:aws:iam::<your_account_id>:role/cnpg-on-eks-prod-irsa`
- **S3 Bucket**: `xyz-cnpg-demo-bucket`

For more information on configuring IAM roles for service accounts (IRSA), refer to the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html).

For details on setting up S3 buckets for backups, check the [AWS S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html).

Now, we are ready to deploy a CloudNativePG database cluster.

**demo-cnpg-cluster.yaml**:

```yaml
apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: demo-cnpg
  namespace: demo
spec:
  description: "Cluster Demo for DoEKS"
  # Choose your PostGres Database Version
  imageName: ghcr.io/cloudnative-pg/postgresql:15.2
  # Number of Replicas
  instances: 3
  startDelay: 300
  stopDelay: 300
  replicationSlots:
    highAvailability:
      enabled: true
    updateInterval: 300
  primaryUpdateStrategy: unsupervised
  serviceAccountTemplate:
    # For backup and restore, we use IRSA for demo tool.
    # You will find this IAM role on terraform outputs.
    metadata:
      annotations:
        eks.amazonaws.com/role-arn: arn:aws:iam::<<account_id>>:role/cnpg-on-eks-prod-irsa #1
  postgresql:
    parameters:
      shared_buffers: 256MB
      pg_stat_statements.max: '10000'
      pg_stat_statements.track: all
      auto_explain.log_min_duration: '10s'
    pg_hba:
      # - hostssl app all all cert
      - host app app all password
  logLevel: debug
  storage:
    storageClass: rook-ceph-block
    size: 1Gi
  walStorage:
    storageClass: rook-ceph-block
    size: 1Gi
  monitoring:
    enablePodMonitor: true
  bootstrap:
    initdb: # Deploying a new cluster
      database: WorldDB
      owner: app
      secret:
        name: app-auth
  backup:
    barmanObjectStore:
    # For backup, we S3 bucket to store data.
    # On this Blueprint, we create an S3 check the terraform output for it.
      destinationPath: s3://<your-s3-demo-bucket> #2
      s3Credentials:
        inheritFromIAMRole: true
      wal:
        compression: gzip
        maxParallel: 8
    retentionPolicy: "30d"

  resources: # m5large: m5xlarge 2vCPU, 8GI RAM
    requests:
      memory: "512Mi"
      cpu: "1"
    limits:
      memory: "1Gi"
      cpu: "2"

  affinity:
    enablePodAntiAffinity: true
    topologyKey: failure-domain.beta.kubernetes.io/zone

  nodeMaintenanceWindow:
    inProgress: false
    reusePVC: false
```

Once updated, you can apply your template.

```shell
kubectl apply -f demo-cnpg-cluster.yaml
```

Now you can check Cluster status is by using cloudnative-pg kubectl plugin offered by the CloudNativePG community.

```shell
$ kubectl cnpg status demo-cnpg
Cluster Summary
Name:               demo-cnpg
Namespace:          demo
System ID:          7214866198623563798
PostgreSQL Image:   ghcr.io/cloudnative-pg/postgresql:15.2
Primary instance:   demo-cnpg-1
Status:             Cluster in healthy state
Instances:          3
Ready instances:    3
Current Write LSN:  0/6000000 (Timeline: 1 - WAL File: 000000010000000000000005)
Certificates Status
Certificate Name  Expiration Date                Days Left Until Expiration
----------------  ---------------                --------------------------
demo-cnpg-ca           2024-07-14 14:40:27 +0000 UTC  89.96
demo-cnpg-replication  2024-07-14 14:40:27 +0000 UTC  89.96
demo-cnpg-server       2024-07-14 14:40:27 +0000 UTC  89.96

Continuous Backup status
First Point of Recoverability:  Not Available
Working WAL archiving:          OK
WALs waiting to be archived:    0
Last Archived WAL:              000000010000000000000005   @   2024-07-01T14:52:09.24307Z
Last Failed WAL:                -

Streaming Replication status
Replication Slots Enabled
Name    Sent LSN   Write LSN  Flush LSN  Replay LSN  Write Lag  Flush Lag  Replay Lag  State      Sync State  Sync Priority  Replication Slot
----    --------   ---------  ---------  ----------  ---------  ---------  ----------  -----      ----------  -------------  ----------------
demo-cnpg-2  0/6000000  0/6000000  0/6000000  0/6000000   00:00:00   00:00:00   00:00:00    streaming  async       0              active
demo-cnpg-3  0/6000000  0/6000000  0/6000000  0/6000000   00:00:00   00:00:00   00:00:00    streaming  async       0              active

Unmanaged Replication Slot Status
No unmanaged replication slots found

Instances status
Name    Database Size  Current LSN  Replication role  Status  QoS         Manager Version  Node
----    -------------  -----------  ----------------  ------  ---         ---------------  ----
demo-cnpg-1  29 MB          0/6000000    Primary           OK      BestEffort  1.19.0           ip-10-1-10-111.eu-west-1.compute.internal
demo-cnpg-2  29 MB          0/6000000    Standby (async)   OK      BestEffort  1.19.0           ip-10-1-12-144.eu-west-1.compute.internal
demo-cnpg-3  29 MB          0/6000000    Standby (async)   OK      BestEffort  1.19.0           ip-10-1-11-78.eu-west-1.compute.internal
```

And there are more to discover like backup, monitoring, etc.

## Key takeaways

When running PostgreSQL on Amazon EKS, it's important to ensure data persistence in Kubernetes. Tools like CloudNativePG help manage highly available PostgreSQL clusters with native streaming replication, ensuring data durability and seamless failover.

**Stay tuned for next blogs in this series🎉**

**References:**

- https://dok.community/blog/the-future-of-data-on-kubernetes
- https://www.reddit.com/r/kubernetes/comments/1dp062w/are_you_running_stateful_data_workloads_or/?sort=old
- https://www.youtube.com/watch?v=99uSJXkKpeI
- https://awslabs.github.io/data-on-eks/docs/blueprints/distributed-databases/cloudnative-postgres
- https://sealos.io/blog/to-run-or-not-to-run-a-database-on-kubernetes
- https://rook.io/docs/rook/latest-release/Getting-Started/intro/
- https://cloudnative-pg.io/documentation/1.22/

**Thank You 🖤**

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
