---
id: e47b0fca551b34c5379ee736
path: "/blog/kubernetes-cluster-autoscaler-cost-effective/"
date: "2024-10-27 20:34:00"
published: true
title: "Kubernetes Cluster autoscaler: automatically scale your AWS EKS cluster for cost savings and performance"
cover: "./k8s-ca-cover.png"
excerpt: "How to use the Kubernetes Cluster Autoscaler to automatically adjust your AWS EKS cluster size, optimizing both cost and performance for your applications."
keywords:
  - Kubernetes
  - Cluster Autoscaler
  - AWS EKS
  - Cost Savings
  - SRE
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Optimal AWS EKS resource utilization**

## 🌃 Introduction

Kubernetes [Cluster Autoscaler](https://github.com/kubernetes/autoscaler) is an excellent tool that can help you save money and improve the performance of your Kubernetes cluster. By automatically scaling the number of nodes in your cluster based on the demand of your workloads, Cluster Autoscaler can help you avoid over-provisioning resources, which can lead to wasted costs.

Additionally, Cluster Autoscaler can help ensure that your pods have the resources they need to run at peak performance.

In this blog post, we will discuss how Cluster Autoscaler works, the benefits of using it, and how to configure it for your Kubernetes cluster.

We will also provide a hands-on guide to deploying Cluster Autoscaler on [AWS Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/).

## 📈 What is Cluster Autoscaler (CA)?

[Cluster Autoscaler](https://github.com/kubernetes/autoscaler) is a Kubernetes add-on that automatically scales the number of nodes in a cluster based on the resource requests of pods. It does not directly measure CPU or memory usage, but instead checks for pods in a pending state, which means that they cannot be scheduled to run on any of the existing nodes. When CA detects pending pods, it will add new nodes to the cluster until all pods are scheduled.

### How does Cluster Autoscaler work?

The following are the steps involved in how Cluster Autoscaler works:

1. **CA checks for pending pods every 10 seconds.**
2. **If there are any pending pods, CA will add a new node to the cluster, as long as it is within the constraints configured by the administrator.**
3. **Kubernetes registers the newly provisioned node with the control plane.**
4. **The Kubernetes scheduler then allocates the pending pods to the new node.**

### Limitations of CA

Cluster Autoscaler has a couple of limitations:

- **It does not make scaling decisions based on CPU or memory usage.** This means that it may not scale the cluster up even if there are pods that are not scheduled due to resource shortages.
- **There is a delay between when CA requests a new node from the cloud provider and when the node is actually provisioned.** This delay can cause performance degradation for pods that are waiting to be scheduled.

## EKS Example: How to implement Cluster Autoscaler

To implement Cluster Autoscaler on AWS Elastic Kubernetes Service (EKS), you can follow these steps:

1. **Review the prerequisites for Cluster Autoscaler.**
2. **Create an EKS cluster in AWS.**
3. **Create an IAM OIDC provider.**
4. **Create an IAM policy for Cluster Autoscaler.**
5. **Create an IAM role for Cluster Autoscaler.**
6. **Deploy Kubernetes Cluster Autoscaler.**
7. **Create an Nginx deployment to test the CA functionality.**

### Prerequisites

Cluster Autoscaler relies on the following tags to identify the AWS Auto Scaling groups that it should manage:

- `k8s.io/cluster-autoscaler/enabled`: This tag must be set to true for CA to manage the Auto Scaling group.
- `k8s.io/cluster-autoscaler/<cluster-name>: "owned"`: This tag specifies the name of the node group that CA should manage.

If these tags are not present, CA will not discover the Auto Scaling group and will not add or remove nodes from the EKS cluster.

```yaml
k8s.io/cluster-autoscaler/enabled=true
k8s.io/cluster-autoscaler/<cluster-name>: "owned"
```

These tags are correct and CA will be able to discover and manage this Auto Scaling group.

### Create an EKS cluster

This walkthrough will create an EKS cluster in AWS with two Auto Scaling groups to demonstrate how Cluster Autoscaler uses the autoscaling group to manage the EKS cluster.

#### Steps

Create an EKS cluster configuration file using the content shown below:

```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
    name: my-cluster
    region: eu-west-1
nodeGroups:
    - name: default
        minSize: 2
        maxSize: 5
        nodeSelector:
            beta.kubernetes.io/os: linux
        # The following tags are required by Cluster Autoscaler to discover the Auto Scaling group.
        tags:
            k8s.io/cluster-autoscaler/enabled: "true"
            k8s.io/cluster-autoscaler/node-group-name: "default"
```

Create the EKS cluster using the following command:

```shell
eksctl create cluster -f cluster.yaml
```

Wait for the EKS cluster to be created. This may take a few minutes.

### Create an IAM OIDC provider

IAM OIDC is used to authorize the Cluster Autoscaler to launch or terminate instances under an Auto Scaling group. In this section, we will see how to configure it with the EKS cluster.

**Steps**

1. **In the EKS cluster console, navigate to the configuration tab and copy the OpenID connect URL.**
2. **Go to the IAM console, and select Identity providers.**
3. **Click Add provider, select OpenID Connect, and click Get thumbprint.**
4. **In the Audience field, enter the following value: `sts.amazonaws.com`**
5. **Click Add provider.**

### Create an IAM policy

Next, we need to create an IAM policy that allows the Cluster Autoscaler to increase or decrease the number of nodes in the cluster.

To create the policy with the necessary permissions, save the following JSON file as `AmazonEKSClusterAutoscalerPolicy.json`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "autoscaling:DescribeAutoScalingGroups",
                "autoscaling:DescribeAutoScalingInstances",
                "autoscaling:DescribeLaunchConfigurations",
                "autoscaling:DescribeTags",
                "autoscaling:SetDesiredCapacity",
                "autoscaling:TerminateInstanceInAutoScalingGroup",
                "ec2:DescribeLaunchTemplateVersions"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}
```

Then, create the policy by running the following AWS CLI command:

```shell
aws iam create-policy --policy-name AmazonEKSClusterAutoscalerPolicy --policy-document file://AmazonEKSClusterAutoscalerPolicy.json
```

To verify that the policy was created successfully, run the following AWS CLI command:

```shell
aws iam list-policies --max-items 1
```

The output of this command should include a policy named `AmazonEKSClusterAutoscalerPolicy` that was created on the current date.

### IAM policy permissions

The IAM policy that you created allows the Cluster Autoscaler to perform the following actions:

- **Describe Auto Scaling groups**
- **Describe Auto Scaling instances**
- **Describe launch configurations**
- **Describe tags**
- **Set the desired capacity of an Auto Scaling group**
- **Terminate an instance in an Auto Scaling group**
- **Describe launch template versions**

These permissions are necessary for the Cluster Autoscaler to manage the number of nodes in the cluster.

### Configuring the IAM Role for the Provider

Following our previous discussion, a critical task lies ahead — establishing an IAM role and linking it to the provider that was set up in Step 3 of our process.

1. **Access the IAM service:** Begin by accessing the console of the AWS Identity and Access Management (IAM) service.
2. **Role Establishment:** Opt for creating a fresh role. Specify that the trusted entity is a web identity.
3. **Target Audience Selection:** Pick `sts.amazonaws.com` as the intended audience. This choice establishes a secure and dependable connection.
4. **Policy Connection:** Associate the meticulously crafted policy with this role. This policy dictates the permissions and access rights of the role.
5. **Validation:** Prior to moving forward, it’s imperative to validate the role and confirm the accurate attachment of the policy.
6. **Refining Trust Relationships:** Proceed to modify the trust relationships of the role that was generated.
7. **Adjusting OIDC Settings:** In this stage, enhance the settings for OIDC (OpenID Connect). Integrate the provided code snippet into the existing configuration:

```json
"Condition": {
    "StringEquals": {
        "oidc.eks.AWS_REGION.amazonaws.com/id/EXAMPLED539D4633E53DE1B716D3041E:aud": "sts.amazonaws.com",
        "oidc.eks.AWS_REGION.amazonaws.com/id/EXAMPLED539D4633E53DE1B716D3041E:sub": "system:serviceaccount:SERVICE_ACCOUNT_NAMESPACE:SERVICE_ACCOUNT_NAME"
    }
}
```

8. **Save Your Modifications:** After implementing these adjustments, preserve the updated trust policy. Your IAM role is now fully equipped with the necessary configurations to operate seamlessly.

### Deploy Cluster Autoscaler

Deploying Cluster Autoscaler is the next step. This involves using the Amazon Resource Names (ARN) number of the previously created IAM role.

To deploy Cluster Autoscaler, follow these steps:

1. **Save the content provided below after the command into a file.**
2. **Run the command provided below using the saved file:**

```shell
kubectl apply -f cluster-autoscaler.yaml
```

Ensure you copy the entire content:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::847845718389:role/AmazonEKSClusterAutoscalerRole
  name: cluster-autoscaler
  namespace: kube-system

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-autoscaler
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
rules:
  - apiGroups: [""]
    resources: ["events", "endpoints"]
    verbs: ["create", "patch"]
  - apiGroups: [""]
    resources: ["pods/eviction"]
    verbs: ["create"]
  - apiGroups: [""]
    resources: ["pods/status"]
    verbs: ["update"]
  - apiGroups: [""]
    resources: ["endpoints"]
    resourceNames: ["cluster-autoscaler"]
    verbs: ["get", "update"]
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["watch", "list", "get", "update"]
  - apiGroups: [""]
    resources:
      - "pods"
      - "services"
      - "replicationcontrollers"
      - "persistentvolumeclaims"
      - "persistentvolumes"
    verbs: ["watch", "list", "get"]
  - apiGroups: ["extensions"]
    resources: ["replicasets", "daemonsets"]
    verbs: ["watch", "list", "get"]
  - apiGroups: ["policy"]
    resources: ["poddisruptionbudgets"]
    verbs: ["watch", "list"]
  - apiGroups: ["apps"]
    resources: ["statefulsets", "replicasets", "daemonsets"]
    verbs: ["watch", "list", "get"]
  - apiGroups: ["storage.k8s.io"]
    resources: ["storageclasses", "csinodes"]
    verbs: ["watch", "list", "get"]
  - apiGroups: ["batch", "extensions"]
    resources: ["jobs"]
    verbs: ["get", "list", "watch", "patch"]
  - apiGroups: ["coordination.k8s.io"]
    resources: ["leases"]
    verbs: ["create"]
  - apiGroups: ["coordination.k8s.io"]
    resourceNames: ["cluster-autoscaler"]
    resources: ["leases"]
    verbs: ["get", "update"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: cluster-autoscaler
  namespace: kube-system
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["create","list","watch"]
  - apiGroups: [""]
    resources: ["configmaps"]
    resourceNames: ["cluster-autoscaler-status", "cluster-autoscaler-priority-expander"]
    verbs: ["delete", "get", "update", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-autoscaler
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-autoscaler
subjects:
  - kind: ServiceAccount
    name: cluster-autoscaler
    namespace: kube-system


---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: cluster-autoscaler
  namespace: kube-system
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: cluster-autoscaler
subjects:
  - kind: ServiceAccount
    name: cluster-autoscaler
    namespace: kube-system

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
  labels:
    app: cluster-autoscaler
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
      annotations:
        cluster-autoscaler.kubernetes.io/safe-to-evict: 'false'
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
        - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.20.0
          name: cluster-autoscaler
          resources:
            limits:
              cpu: 100m
              memory: 500Mi
            requests:
              cpu: 100m
              memory: 500Mi
          command:
            - ./cluster-autoscaler
            - --v=4
            - --stderrthreshold=info
            - --cloud-provider=aws
            - --skip-nodes-with-local-storage=false
            - --expander=least-waste
            - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/demo-ca-cluster
            - --balance-similar-node-groups
            - --skip-nodes-with-system-pods=false
          volumeMounts:
            - name: ssl-certs
              mountPath: /etc/ssl/certs/ca-certificates.crt #/etc/ssl/certs/ca-bundle.crt for Amazon Linux Worker Nodes
              readOnly: true
          imagePullPolicy: "Always"
      volumes:
        - name: ssl-certs
          hostPath:
            path: "/etc/ssl/certs/ca-bundle.crt"
```

Next, verify the logs by issuing this command:

```shell
kubectl logs -l app=cluster-autoscaler -n kube-system -f
```

CA will now check for unscheduled pods and try to schedule them. You can see those actions from the logs. Check the status of the pods by issuing the following command:

```shell
kubectl get pods -n kube-system
```

### 🛠️ Create an Nginx Deployment to Test Autoscaler Functionality

We are going to create two deployments: one for the managed node group, and another deployment for the unmanaged node group.

#### Managed Node Group Deployment

Create a configuration file based on the content below:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: nginx-managed
    namespace: default
spec:
    replicas: 2
    selector:
        matchLabels:
            app: nginx-managed
    template:
        metadata:
            labels:
                app: nginx-managed
        spec:
            containers:
            - name: nginx-managed
                image: nginx:latest
                ports:
                - containerPort: 80
            affinity:
                nodeAffinity:
                    requiredDuringSchedulingIgnoredDuringExecution:
                        nodeSelectorTerms:
                        - matchExpressions:
                            - key: role
                                operator: In
                                values:
                                - managed-nodes
                podAntiAffinity:
                    requiredDuringSchedulingIgnoredDuringExecution:
                    - labelSelector:
                            matchExpressions:
                            - key: app
                                operator: In
                                values:
                                - nginx-managed
                        topologyKey: kubernetes.io/hostname
                        namespaces:
                        - default
```

> **Note:** The above configurations make use of `nodeAffinity` to select the node group with the label `role=managed-nodes` to help control where the scheduler provisions the pods.

Apply the changes:

```shell
kubectl apply -f 1-nginx-managed.yaml
```

#### Unmanaged Node Group Deployment

For the unmanaged node group, create a configuration file using the content below:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: nginx-unmanaged
    namespace: default
spec:
    replicas: 2
    selector:
        matchLabels:
            app: nginx-unmanaged
    template:
        metadata:
            labels:
                app: nginx-unmanaged
        spec:
            containers:
            - name: nginx-unmanaged
                image: nginx:1.14.2
                ports:
                - containerPort: 80
            affinity:
                nodeAffinity:
                    requiredDuringSchedulingIgnoredDuringExecution:
                        nodeSelectorTerms:
                        - matchExpressions:
                            - key: role
                                operator: In
                                values:
                                - unmanaged-nodes
                podAntiAffinity:
                    requiredDuringSchedulingIgnoredDuringExecution:
                    - labelSelector:
                            matchExpressions:
                            - key: app
                                operator: In
                                values:
                                - nginx-unmanaged
                        topologyKey: kubernetes.io/hostname
                        namespaces:
                        - default
```

Apply the changes:

```shell
kubectl apply -f 2-nginx-unmanaged.yaml
```

Check the status of the pods:

```shell
kubectl get pods -n default
```

```shell
NAME                               READY   STATUS    RESTARTS   AGE
nginx-managed-7cf8b6449c-mctsg     1/1     Running   0          60s
nginx-managed-7cf8b6449c-vjvxf     0/1     Pending   0          60s
nginx-unmanaged-67dcfb44c9-gvjg4   0/1     Pending   0          52s
nginx-unmanaged-67dcfb44c9-wqnvr   1/1     Running   0          52s
```

Now, you can see two of the four pods are running because we have only two nodes in the cluster. Please note that we have used a [pod AntiAffinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity) configuration to prevent Kubernetes from provisioning multiple pods of this deployment on the same node (thereby avoiding the need for the additional capacity required to demonstrate CA’s functionality).

The Cluster Autoscaler will check the state of the pods, discover that some are in a “pending” state, and try to provision new nodes in the cluster. In a few minutes, you will see a third node provisioned.

One pod is still in a pending state because we did not add the label when we created the EKS cluster with managed/unmanaged node groups. If the label is not present in the Auto Scaling group, then the Cluster Autoscaler will not discover the Auto Scaling group to scale the cluster.

## 🔚 Summary

Kubernetes Cluster Autoscaler (CA) is a tool that automatically scales up or down the number of nodes in a Kubernetes cluster based on the number of pods that are running. This can help to improve resource utilization and reduce costs.

In this blog post, we discussed how CA works and how to deploy it in your cluster. We also looked at some of the best practices for configuring CA to optimize resource utilization and performance.

By following the tips in this blog post, you can use CA to automatically scale your cluster and ensure that you are only paying for the resources that you need. This can help you to save money and improve the performance of your applications.

<br>

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

**Subscribe to our newsletter for more insights on AWS cloud computing and containers.**
