---
id: 1543b8f3209c96b953f80638
path: "/blog/eks-node-health-monitoring/"
date: "2024-12-23 08:00:00"
published: true
title: "Node Health Monitoring and Auto-Repair for Amazon EKS"
cover: "./eks-node-health-monitoring.png"
excerpt: "Learn how Amazon EKS's new Node Health Monitoring and Auto-Repair features can help you maintain higher availability and reduce operational overhead for your Kubernetes clusters."
keywords:
  - Amazon EKS
  - EKS
  - Kubernetes
  - Node Health Monitoring
  - Auto-Repair
  - Cloud Computing
coverCredits: 'Photo by Saifeddine Rajhi'
---

## Overiew of Node health monitoring and auto-repair for Amazon EKS

Amazon Elastic Kubernetes Service (Amazon EKS) continues to innovate beyond re:Invent with [the introduction of Node Health Monitoring and Auto-Repair](https://aws.amazon.com/about-aws/whats-new/2024/12/node-health-monitoring-auto-repair-amazon-eks/).

This groundbreaking feature is designed to automatically monitor and repair EC2 instances (nodes) in your Kubernetes clusters, ensuring your infrastructure remains at peak performance.

This is particularly beneficial for workloads using accelerated instances for machine learning.

![alt text](eks-node-health-monitoring.png)

### Overview

Managing the health of nodes in a Kubernetes cluster can be a daunting task, often requiring significant operational effort to ensure resilience and performance. Amazon EKS now simplifies this process with Node Health Monitoring and Auto-Repair, which continuously monitors the health of nodes and takes automatic corrective actions when issues are detected.

### Key Features

#### Node Monitoring Agent

The Node Monitoring Agent is a powerful tool that continuously reads node logs to detect a variety of health issues specific to Kubernetes environments. This agent identifies problems such as storage and networking issues and applies dedicated NodeConditions to worker nodes. These conditions are then surfaced in the observability dashboard, providing detailed insights into the health of your nodes.

- **Automatic Detection**: The agent parses node logs to detect failures and surface status information.
- **NodeConditions**: Specific conditions are applied for detected issues, such as KernelReady, NetworkingReady, and StorageReady.
- **Observability Dashboard**: Detailed descriptions of detected health issues are available for monitoring.

#### Node Auto Repair

Node Auto Repair works in tandem with the Node Monitoring Agent to ensure that any detected issues are promptly addressed, thereby maintaining the overall health and availability of your cluster.

- **Continuous Monitoring**: The feature continuously monitors node health and reacts to detected problems.
- **Automatic Replacement**: Nodes with issues are automatically cordoned and replaced to maintain cluster health.
- **Enhanced Reliability**: Addresses intermittent node issues, such as unresponsive kubelets and increased device errors.

### How It Works

When the Node Monitoring Agent detects a health issue, it applies a specific NodeCondition to the affected node. If Node Auto Repair is enabled, it will automatically take corrective actions based on the type of issue detected. For example, if a node is experiencing networking issues, it may be cordoned and replaced to prevent disruption to your workloads.

### Enabling Node Health Monitoring and Auto-Repair

To enable these features, you need to install the EKS node monitoring agent add-on and enable node auto-repair in the EKS managed node group APIs or AWS Console. EKS Auto Mode comes with both features enabled by default.

- **AWS Console**: Activate the "Enable node auto repair" checkbox for the managed node group.
- **AWS CLI**: Use the `--node-repair-config enabled=true` option with the `eks create nodegroup` or `eks update-nodegroup-config` command.

### Availability

Node Health Monitoring and Auto-Repair is available at no additional cost in all AWS Regions, except AWS GovCloud (US) and China Regions. This ensures that you can leverage these powerful features to maintain the health of your Kubernetes clusters without incurring extra costs.

### Benefits

#### Improved Cluster Availability

By automatically detecting and addressing node health issues, these features help ensure that your Kubernetes clusters remain highly available. This is particularly important for applications that require high availability and minimal downtime.

#### Reduced Operational Overhead

Managing node health manually can be time-consuming and complex. With Node Health Monitoring and Auto-Repair, much of this work is automated, freeing up your team to focus on other critical tasks.

#### Enhanced Performance for Machine Learning Workloads

For workloads that use accelerated instances, such as those for machine learning, maintaining node health is crucial. These features help ensure that your nodes are always in optimal condition, which is essential for performance-intensive applications.

### Detailed Node Health Issues

The Node Monitoring Agent can detect a wide range of health issues, categorized into conditions and events. Conditions are terminal issues that warrant remediation actions like instance replacement or reboot, while events are temporary issues or sub-optimal configurations that do not trigger auto-repair actions.

#### Kernel Node Health Issues

- **ForkFailedOutOfPID**: A fork or exec call has failed due to the system being out of process IDs or memory.
- **AppBlocked**: A task has been blocked for a long period, usually due to input/output blocking.
- **AppCrash**: An application on the node has crashed.
- **ApproachingKernelPidMax**: The number of processes is nearing the maximum allowed by the kernel.
- **ConntrackExceededKernel**: Connection tracking exceeded the maximum for the kernel, leading to packet loss.

#### Networking Node Health Issues

- **InterfaceNotRunning**: The network interface is not running or there are network issues.
- **IPAMDNotReady**: IPAMD fails to connect to the API server.
- **BandwidthInExceeded**: Inbound bandwidth exceeded the maximum for the instance, causing packet loss.
- **ConntrackExceeded**: Connection tracking exceeded the maximum for the instance, leading to packet loss.

#### NVIDIA Node Health Issues

- **NvidiaDoubleBitError**: A double bit error was produced by the GPU driver, requiring node replacement.
- **NvidiaXID13Error**: A graphics engine exception, requiring node reboot.
- **NvidiaXID79Error**: The GPU driver found the GPU inaccessible over PCI Express, requiring node replacement.

### Conclusion

The introduction of Node Health Monitoring and Auto-Repair for Amazon EKS is a significant advancement in maintaining the health and performance of your Kubernetes clusters. By automating the detection and remediation of node health issues, these features help ensure that your clusters remain resilient and operational with minimal manual intervention.

For more information, visit the Amazon EKS documentation.

<br>
<br>

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📻🧡 Resources**

- https://docs.aws.amazon.com/eks/latest/userguide/eks-node-health.html
- https://aws.amazon.com/about-aws/whats-new/2024/12/node-health-monitoring-auto-repair-amazon-eks/

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
