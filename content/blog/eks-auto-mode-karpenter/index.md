---
id: 1f2881d4a5cd1bf815c04dda
path: "/blog/ekspert-automation-auto-mode-karpenter/"
date: "2025-01-20 22:00:00"
published: true
title: "EKS'pert Automation: Amazon EKS Auto Mode and Karpenter in action"
cover: "./cover.png"
excerpt: "Automate Your Amazon EKS Journey with Auto Mode and Karpenter in Action"
keywords:
  - AWS EKS
  - Amazon EKS
  - Karpenter
  - Kubernetes
  - Automation
  - Auto mode
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Automate Your Amazon EKS Journey with Auto Mode and Karpenter in Action**

## 🚀 Introduction

In the quest for seamless Kubernetes management, automation is key.

This blog explores how [Karpenter](https://karpenter.sh/) and [EKS Auto Mode](https://docs.aws.amazon.com/eks/latest/userguide/automode.html) transform Amazon Kubernetes cluster management.

By overcoming the limitations of traditional scaling tools, optimizing resource usage, and automating infrastructure provisioning and updates, these tools ensure your clusters are efficient and cost-effective.

Amazon EKS Auto Mode further enhances deployment by managing compute, networking, and storage, dynamically scaling resources based on application needs, and maintaining security through automatic updates and health monitoring.

## Introduction to Amazon EKS and Karpenter

Amazon Elastic Kubernetes Service EKS simplifies the deployment and management of Kubernetes (k8s) clusters. Kubernetes is a well-known container orchestration platform, but managing its control plane can be complex and resource-intensive. EKS provides a managed control plane, ensuring scalability, high availability, and security.

### Scaling Applications with Traditional Tools

Traditional tools like Cluster Autoscaler have several challenges:

- **Node Groups Management**: Requires creating and managing multiple node groups.
- **Instance Family Specification**: Users must specify instance families and their priorities.
- **Autoscaling Groups**: Each node group needs a separate autoscaling group, complicating management.
- **AMI Selection and Refresh**: Managing AMI (Amazon Machine Image) selection and updates can be cumbersome.

### Karpenter: A Modern Solution for Scaling

Karpenter is a Kubernetes-native autoscaler designed to overcome these limitations. It interacts directly with EC2 Fleet, bypassing the need for node groups and autoscaling groups, resulting in faster and more efficient instance provisioning. Karpenter uses YAML files (NodePool and EC2NodeClass) to manage its behavior, offering flexibility and control.

### Key Insights

1. **🔍 What is Karpenter?**
   Karpenter automatically adds or removes servers (nodes) in a Kubernetes cluster, adjusting resources dynamically to match workloads.

2. **⚖️ Karpenter vs. Cluster Autoscaler**
   Karpenter communicates directly with cloud providers (like AWS EC2) and can add new resources in seconds instead of minutes.

3. **📊 Choosing the Right Resources Automatically**
   Karpenter selects the best type of server based on application needs (CPU, memory, etc.), simplifying setup and saving time.

4. **🔄 Save Money with Resource Consolidation**
   Karpenter combines workloads on fewer servers, moving workloads around and shutting down idle servers to reduce costs.

5. **⚙️ Works with Kubernetes Scheduling**
   Karpenter integrates seamlessly with Kubernetes, respecting all scheduling rules and supporting specialized applications.

6. **💡 Supports All Types of Workloads**
   Karpenter handles high-performance servers, GPUs, specific configurations, and works across different environments, including multi-cloud setups.

7. **📚 Easy to Learn and Use**
   This guide covers everything from understanding scaling to implementing Karpenter in real-world scenarios.

### Key Features of Karpenter

- [NodePool YAML](https://karpenter.sh/v1.1/concepts/nodepools/): Specify instance families, availability zones, architecture types (x86 or ARM), and capacity types (spot and on-demand).
- [Scheduling Constraints](https://karpenter.sh/v1.1/concepts/scheduling/): Supports node selectors, node affinity, taints and tolerations, and topology spread.
- **User-Defined Labels**: Enables custom labels, taints, and annotations.
- **Cost Optimization**: Automatically consolidates underutilized nodes.
- [Disruption Budget](https://karpenter.sh/docs/concepts/disruption/#disruption-budgets): Controls when nodes can be disrupted, with configurable policies.
- [Drift Management](https://karpenter.sh/docs/concepts/disruption/#drift): Ensures the desired state matches the current state by reconciling node configurations.
- [EC2NodeClass](https://karpenter.sh/v1.1/concepts/nodeclasses/): Manages AMI selection, subnets, security groups, and other configurations.

### Advanced AMI Management

Karpenter supports using Amazon EKS optimized AMIs, including BottleRocket and Amazon Linux 2. Users can pin worker nodes to specific AMI versions for testing before rolling out updates. Custom AMIs are also supported, allowing selection by tag, name, owner, or ID. If multiple AMIs match the criteria, Karpenter uses the latest one.

### New Features in Karpenter v1

1. **Enhanced Disruption Controls by Reason**
   Specify disruption budgets based on reasons like Underutilized, Empty, or Drifted.

2. **Forceful Disruption Mode**
   Balance application availability against security requirements with assertive node lifecycle management.

3. **Expanded consolidateAfter Functionality**
   Define how long Karpenter should wait before consolidating underutilized nodes.

### Challenges and Solutions Beyond Karpenter

While Karpenter addresses many scaling challenges, managing core cluster capabilities like networking, service discovery, and load balancing remains complex. Upgrading and securing Kubernetes clusters also require dedicated expertise and continuous time investment.

## Introduction to Amazon EKS Auto Mode

Amazon EKS Auto Mode offloads more operational responsibilities to AWS, extending AWS's responsibility from the control plane to the data plane, including compute, networking, and storage.

EKS Auto Mode dynamically scales compute resources based on application needs, optimizes costs through dynamic scaling and capacity planning, and automatically updates worker nodes and applies security fixes.

### Benefits of EKS Auto Mode

- **Simplified Deployment**: Reduces the steps needed to deploy applications by automating infrastructure provisioning and management.
- **Managed Core Capabilities**: Provides managed compute, network, and storage capabilities out of the box.
- **Health Monitoring and Auto Repair**: Includes health monitoring and auto-repair features.
- **Networking Enhancements**: Simplifies networking with managed VPC CNI, network policies, and in-cluster service load balancing.
- **Shared Responsibility Model**: Shifts more responsibility to AWS, allowing customers to focus on application innovation.

### Getting Started with EKS Auto Mode

EKS Auto Mode simplifies cluster creation with a single-click setup and built-in best practices.

It provides two default node pools (general purpose and system) supporting a mix of instance types and architectures (Graviton and x86). Users can also define custom node pools for specific use cases like GPU instances, spot instances, and tenant isolation.

**Key Features of EKS Auto Mode:**

- **General Purpose Node Pool**: Supports a mix of on-demand instance types, consolidation enabled by default, and a default node expiry of 14 days.
- **System Node Pool**: Dedicated for critical add-ons, supports both AMD and ARM architectures, and includes a special taint to prevent scheduling regular workloads.
- **User-Defined Node Pools**: Allows customization for specific use cases, such as GPU instances, spot instances, and tenant isolation.
- **EKSNodeClass**: Manages security groups and subnets without requiring AMI selectors, as AWS handles the lifecycle of EC2 instances.

### Day Two Operations and Updates

EKS Auto Mode handles updates for core capabilities and data plane nodes, respecting disruption budgets and ensuring minimal impact on running applications. Security updates are automatically applied, and worker nodes are updated in a rolling deployment fashion.

**Automatic Updates:**

- **Core Capabilities**: Automatically updates core capabilities like Karpenter, storage controllers, and network controllers.
- **Data Plane Nodes**: Worker nodes are updated to the latest AMI versions, respecting disruption budgets.
- **Security Updates**: Security patches are applied automatically, ensuring a secure environment.

### Conclusion

Amazon EKS, Karpenter, and EKS Auto Mode collectively enhance Kubernetes cluster management by simplifying scaling, optimizing costs, and automating infrastructure provisioning and updates. These tools provide robust solutions for modern cloud-based applications, allowing users to focus on innovation while AWS handles the operational complexities.

This comprehensive approach ensures efficient, secure, and cost-effective Kubernetes cluster management, making it easier for users to deploy and manage their applications at scale.

**Thank You 🖤**

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
