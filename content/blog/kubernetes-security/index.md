---
id: c803becb6654cac191108931
path: "/blog/kubernetes-security/"
date: "2024-10-18 19:30:00"
published: true
title: "Kubernetes: Security assessment guidelines and necessary checklist"
cover: "./k8s-sec-cover.png"
excerpt: "Learn about essential security assessment guidelines and checklists for Kubernetes, ensuring your clusters are secure and compliant with best practices."
keywords:
  - Kubernetes
  - Security assessment
  - Best practices
  - Open source
  - CNCF
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Essential Guidelines and Checklists for Kubernetes Security**

## 📚 Introduction

The Kubernetes platform has become increasingly popular for managing containerized applications, making it a critical component of many organizations' infrastructure. With the increasing adoption of Kubernetes, the importance of ensuring its security cannot be overstated. Kubernetes security measures refer to a comprehensive set of guidelines and criteria aimed at ensuring the security of a Kubernetes deployment. It also covers various aspects of security such as network security, access control, image signing, and more.

### 🎯 Goals & Objectives

The purpose of this checklist is to provide a systematic approach to securing a Kubernetes cluster and to ensure that all necessary steps are taken to protect the cluster from potential threats. In a nutshell, it provides a starting point for organizations to evaluate the security of their Kubernetes deployment and make any necessary changes to ensure its safety.

https://giphy.com/gifs/computer-mograph-hack-077i6AULCXc0FKTj9s

## 🔒 Security Checklist

The following are some of the items that may be included in a Kubernetes security checklist:

### 🔑 Authentication

- **Use an Identity Provider (IdP)**: Using an identity provider such as [OIDC](https://openid.net/connect/) is recommended for authentication to the Kubernetes API, as it provides a centralized and secure way to manage user identities.
  
- **Avoid Service Account Tokens**: Service account tokens are less secure and should not be used for authentication. Instead, using an IdP helps ensure that the authentication process is robust and follows industry standards for security.

- **Centralized Certificate Management**: Using a centralized certificate management service is a best practice for managing certificates within a Kubernetes cluster. It provides a centralized and secure way to manage and distribute certificates, ensuring that all components within the cluster use the correct and up-to-date certificates. This helps to ensure the security and trustworthiness of communication within the cluster.

- **Personalized User Accounts**: It is important to have personalized user accounts in a Kubernetes cluster. This helps to ensure accountability and traceability of actions within the cluster. Naming the service accounts in a way that reflects their purpose and access rights is also a best practice, as it makes it easier to understand the intended use of each account and to manage permissions effectively.

### 🛡️ Authorization

- **Implement Role-Based Access Control (RBAC)**: Implementing [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) for the Kubernetes cluster helps simplify the management of user permissions and reduces the risk of misconfigured permissions, making the cluster more secure and easier to manage. Rights should be assigned within the namespace based on the principle of least privilege and separation of duties. Tools like [RBAC-tool](https://github.com/alcideio/rbac-tool) can assist in this process.

- **Unique Service Accounts**: Ensure all services have a unique service account with configured RBAC rights. This practice helps to maintain clear boundaries and accountability for each service within the cluster.

- **Formal Approval Process**: Enforce a formal approval process for granting access to a production environment in a Kubernetes cluster. This ensures that only authorized users have access to sensitive production data and systems, reducing the risk of security breaches or unauthorized changes.

- **Prohibit User Impersonation**: Prohibit [user impersonation](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#user-impersonation) in a Kubernetes cluster. User impersonation can lead to security and accountability issues, so it is crucial to restrict this capability.

- **Privileged Access Management**: Cluster administrators and maintainers should use privileged access management systems, such as [Teleport](https://goteleport.com/docs/kubernetes-access/introduction/) or [Boundary](https://www.hashicorp.com/blog/gating-access-to-kubernetes-with-hashicorp-boundary), when interacting with the cluster API and infrastructure services. These systems provide a secure and auditable way to access the cluster, helping to ensure that sensitive data and systems are not compromised.

- **Namespace Segmentation**: Dividing information systems into separate namespaces is a best practice in Kubernetes. This helps to enforce security boundaries between different systems, reducing the risk of unauthorized access or changes. It also makes it easier to manage and control access to each system.

- **Regular RBAC Audits**: Regularly audit the role-based access control (RBAC) rights within a Kubernetes cluster. Tools like [Kubiscan](https://github.com/cyberark/KubiScan) or [Krane](https://github.com/appvia/krane) can be used to automate this process, helping to ensure that RBAC rights are up-to-date and comply with security policies.

### 🔐 Secrets

- **Secure Secret Storage**: Store secrets in a secure manner within a Kubernetes cluster. This can be done by using third-party secret management systems such as [Hashicorp Vault](https://developer.hashicorp.com/vault/docs/platform/k8s) or [Conjur](https://www.conjur.org/blog/securing-secrets-in-kubernetes/), or by storing secrets in etcd in encrypted form. This helps to protect sensitive information, such as passwords, API keys, and other secrets, from unauthorized access or change.

- **Secure Mechanisms for Adding Secrets**: Use secure mechanisms for adding secrets to containers in a Kubernetes cluster. This can be done by using the `volumeMount` mechanism or the `secretKeyRef` mechanism.

- **Sealed Secrets**: Use tools like the [sealed-secrets](https://github.com/bitnami-labs/sealed-secrets) tool to hide secrets in source code, which can help encrypt secrets and securely store them. This helps to ensure that secrets are not exposed in the source code or version control systems, reducing the risk of unauthorized access or changes.

### 🔧 Cluster Configuration Security

- **Mutual TLS Encryption**: Use mutual TLS encryption between all cluster components to ensure secure communication.

- **Service Mesh Deployment**: Deploy a service mesh to reduce the risk of security incidents and improve the reliability and performance of your applications. Consider using an established service mesh solution, such as [Istio](https://istio.io/) or [Linkerd](https://linkerd.io/), to ensure that your service mesh is well-supported and reliable.

- **Policy Engine**: Use a policy engine to enforce security and compliance policies within a Kubernetes cluster. A policy engine allows you to define, enforce, and manage policies for your cluster. There are several policy engines to choose from, including [OPA](https://www.openpolicyagent.org/docs/latest/kubernetes-introduction/), [Kyverno](https://kyverno.io/), [jsPolicy](https://www.jspolicy.com/), and [Kubewarden](https://www.kubewarden.io/).

- **CIS Benchmark Compliance**: Complying with the [CIS (Center for Internet Security) Benchmark for Kubernetes](https://www.cisecurity.org/benchmark/kubernetes) is a best practice for securing a Kubernetes cluster.

- **Latest Versions**: It is recommended to use only the latest versions of cluster components. Refer to the [CVE list](https://www.container-security.site/general_information/container_cve_list.html) for known vulnerabilities.

- **High Isolation Runtimes**: For services with increased security requirements, use a low-level runtime with a high degree of isolation, such as [gVisor](https://gvisor.dev/docs/user_guide/quick_start/kubernetes/) or [Kata-runtime](https://github.com/kata-containers/documentation/blob/master/how-to/run-kata-with-k8s.md).

- **Regular Auditing**: Regular auditing of the cluster configuration is critical for maintaining the security and stability of a Kubernetes cluster. Tools like [Kube-bench](https://github.com/aquasecurity/kube-bench), [Kube-hunter](https://github.com/aquasecurity/kube-hunter), and [Kubestriker](https://www.kubestriker.io/) can be used to audit the configuration regularly.

### 📊 Audit and Logging

- **Audit Logging**: Enable audit logging cluster-wide to track all activities.

- **Access Rights Logging**: Log all cases of changing access rights in the cluster.

- **Secrets Operations Logging**: Log all operations with secrets, including creation, deletion, access, and modification. Tools such as [syslog](https://www.syslog-ng.com/products/open-source-log-management/), [Fluentd](https://docs.fluentd.org/v/0.12/articles/kubernetes-fluentd), or the [ELK Stack](https://logz.io/blog/deploying-the-elk-stack-on-kubernetes-with-helm/) can be used to aggregate and analyze logs.

- **External Audit Logging**: The audit logging system should be located outside the Kubernetes cluster.

- **Observability and Visibility**: Building observability and visibility processes in the infrastructure and services can help understand what is happening and identify issues in real-time. Tools like [Luntry](https://luntry.com/), [DataDog](https://www.datadoghq.com/), or [WeaveScope](https://www.weave.works/oss/scope/) can be used.

- **Security Monitoring Tools**: Use third-party security monitoring tools on all cluster nodes, such as [Falco](https://falco.org/), [SysDig](https://sysdig.com/), [Aqua Enterprise](https://www.aquasec.com/), [NeuVector](https://neuvector.com/), or [Prisma Cloud Compute](https://www.paloaltonetworks.com/prisma/cloud).

### 🖥️ Secure OS Configuration

- **Privileged Access Management**: Host administrators and maintainers should interact with cluster nodes through privileged access management systems (PAM) to ensure security and integrity.

- **OS and Software Configuration**: Configure the operating system (OS) and software following established baselines and standards to ensure security, stability, and compatibility. Refer to [CIS](https://www.cisecurity.org/cis-benchmarks/) and [NIST](https://ncp.nist.gov/repository) guidelines.

- **Security Weakness Checks**: Frequently check packages and setups for security weaknesses using tools such as [OpenSCAP](https://static.open-scap.org/) profiles or [Lynis](https://cisofy.com/lynis/).

- **Kernel Updates**: Keep the OS kernel version updated regularly. Tools like [CVEhound](https://github.com/evdenis/cvehound) can be helpful.

### 🌐 Network Security

- **Network Policies**: All namespaces should have NetworkPolicy. Communication between namespaces should be controlled through NetworkPolicy and follow the principle of least privilege. Tools like [Inspektor Gadget](https://github.com/inspektor-gadget/inspektor-gadget) can assist.

- **Authentication and Authorization**: Ensure that only authorized users and services can access resources by implementing authentication and authorization for all application microservices. [Consul](https://developer.hashicorp.com/consul/docs/architecture) can help fulfill this practice.

- **Interface Security**: Keep the interfaces of cluster components and infrastructure tools inaccessible from the Internet.

### 🛠️ Secure Configuration of Workloads

- **Avoid Running Pods as Root**: Do not run pods under the [root account](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) (UID 0). Set the `runAsUser` parameter for all applications. [Learn more](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).
- **Disallow Privilege Escalation**: Set `allowPrivilegeEscalation` to `false`. [More info](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/).
- **Avoid Privileged Pods**: Do not run [privileged pods](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) (`privileged: true`).
- **Read-Only Filesystem**: It is a best practice to set `readonlyRootFilesystem` to `true`. [Details here](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/).
- **Avoid Host PID and IPC**: It is not recommended to use `hostPID` and `hostIPC`.
- **Avoid Host Network**: Using `hostNetwork` is generally a bad idea.
- **Restrict Unsafe Syscalls**: Do not use unsafe system calls (sysctl) such as `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`. [Reference](https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/).
- **Avoid HostPath**: Do not use [hostPath](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems).
- **Set Resource Limits**: Use [CPU/RAM limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/). The values should be the minimum required for the containerized application to work.
- **Minimal Capabilities**: Capabilities should be set according to the principle of least privileges. Drop 'ALL', then enumerate all necessary capabilities for the application to work. Prohibited capabilities include:
    - `CAP_FSETID`
    - `CAP_SETUID`
    - `CAP_SETGID`
    - `CAP_SYS_CHROOT`
    - `CAP_SYS_PTRACE`
    - `CAP_CHOWN`
    - `CAP_NET_RAW`
    - `CAP_NET_ADMIN`
    - `CAP_NET_BIND_SERVICE`
- **Security Profiles**: The application should have a seccomp, AppArmor, or SELinux profile according to the principles of least privileges. Tools include [Udica](https://github.com/containers/udica), [Oci-seccomp-bpf-hook](https://github.com/containers/oci-seccomp-bpf-hook), [Go2seccomp](https://github.com/xfernando/go2seccomp), and [Security Profiles Operator](https://github.com/kubernetes-sigs/security-profiles-operator).
- **Regular Audits**: Workload configuration should be audited regularly using tools like [Kics](https://checkmarx.com/product/opensource/kics-open-source-infrastructure-as-code-project/), [Kubeaudit](https://github.com/Shopify/kubeaudit), [Kubescape](https://github.com/kubescape/kubescape), [Conftest](https://github.com/open-policy-agent/conftest), [Kubesec](https://github.com/controlplaneio/kubesec), and [Checkov](https://github.com/bridgecrewio/checkov).

### 🛠️ Secure Image Build

- **Avoid Sudo in RUN Command**: Do not use the `RUN` command with `sudo`.
- **Use COPY Instead of ADD**: Use `COPY` instead of `ADD` instruction.
- **Avoid Automatic Package Updates**: Avoid automatic package updates via `apt-get upgrade`, `yum update`, `apt-get dist-upgrade`.
- **Specify Package Versions**: Explicitly indicate the versions of the installed packages. Use SBOM building tools like [Syft](https://github.com/anchore/syft) to determine the list of packages.
- **Do Not Store Sensitive Information**: Do not store sensitive information (passwords, tokens, certificates) in the Dockerfile.
- **Minimal Packages**: The composition of the packages in the container image should be minimal enough to work.
- **Minimal Port Range**: The port range forwarded into the container should be minimal enough to work.
- **Avoid wget, curl, and netcat**: It is not recommended to install `wget`, `curl`, and `netcat` inside the production application image and container.
- **Use .dockerignore**: Use `.dockerignore` to prevent putting sensitive information inside the image.
- **Minimize Layers**: Use a minimum number of layers using a [multi-stage build](https://docs.docker.com/build/building/multi-stage/).
- **Use WORKDIR**: It is recommended to use `WORKDIR` as an absolute path. Avoid using `cd` instead of `WORKDIR`.
- **Avoid Recursive Copying**: Beware of recursive copying using `COPY . ..`.
- **Avoid Latest Tag**: It is not recommended to use the `latest` tag.
- **Do Not Run Remote Control Tools**: Do not run remote control tools in a container.
- **Image Signature**: Based on the results of scanning Docker images, an image signature should be generated and verified before deployment. Tools include [Notary](https://medium.com/sse-blog/verify-container-image-signatures-in-kubernetes-using-notary-or-cosign-or-both-c25d9e79ec45) and [Cosign](https://medium.com/sse-blog/verify-container-image-signatures-in-kubernetes-using-notary-or-cosign-or-both-c25d9e79ec45).
- **Automated Scanners**: Dockerfile should be checked during development by automated scanners like [Kics](https://checkmarx.com/product/opensource/kics-open-source-infrastructure-as-code-project/), [Conftest](https://github.com/open-policy-agent/conftest), [Container-security-checklist](https://github.com/krol3/container-security-checklist), and [Hadolint](https://github.com/hadolint/hadolint).
- **Image Scanning**: All images should be checked in the application lifecycle by automated scanners like [Trivy](https://github.com/aquasecurity/trivy), [Clair](https://github.com/quay/clair), and [Grype](https://github.com/anchore/grype).
- **Secure CI/CD**: Build secure CI and CD as part of the supply chain process. Refer to [SLSA](https://github.com/slsa-framework/slsa).

### 🌟 Conclusion 🌟

Follow the best practices compiled in these lists and you'll have taken the most important steps to successfully hardening your Kubernetes environments and protecting your critical business applications.

**Resources:**

- [Spacelift Blog on Kubernetes Security](https://spacelift.io/blog/kubernetes-security)
- [Docker Security Documentation](https://docs.docker.com/engine/security/)
- [AquaSec Docker Security Best Practices](https://blog.aquasec.com/docker-security-best-practices)
- [AquaSec Kubernetes Security Best Practices](https://www.aquasec.com/cloud-native-academy/kubernetes-in-production/kubernetes-security-best-practices-10-steps-to-securing-k8s/)
- [Kubernetes Security Documentation](https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/)
- [OWASP Kubernetes Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Kubernetes_Security_Cheat_Sheet.html)
- [YouTube: Kubernetes Security](https://youtu.be/oBf5lrmquYI)

<br>

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  _**Until next time 🎉**_

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
