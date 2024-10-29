---
id: ee470f115f4237fc9cac1b1c
path: "/blog/kubernetes-rbac-privilege-escalation-mitigation/"
date: "2024-10-29 21:30:00"
published: true
title: "Kubernetes RBAC: Privilege Escalation Exploits and Mitigations 🔒"
cover: "./kubernetes-rbac-cover.png"
excerpt: "Understand the risks of privilege escalation in Kubernetes RBAC and learn effective mitigation strategies to secure your cluster."
keywords:
  - Kubernetes
  - RBAC
  - Privilege Escalation
  - Security
  - k8s
  - DevOps
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **RBAC: Mapping Out Privilege Escalation Routes 🔒**

## 🎑 Introduction

Kubernetes, the open-source container orchestration system, has revolutionized the world of container management. Its RBAC module ensures that only authorized entities can access cluster resources. However, as with any complex system, there are nuances to be explored, and certain permissions can inadvertently pave the way for privilege escalation.

In this blog post, we will explore seven distinct privilege escalation threat vectors, empowered by specific permissions, including:

- Creating Pods
- Reading Secrets
- Binding Roles
- Escalating Existing Roles
- Impersonating Entities in the Cluster

For each threat vector, we will provide a detailed explanation of how the exploit can be executed and discuss potential mitigations.


https://giphy.com/gifs/super-saiyan-ul1omlrGG6kpO


## ▶️ Pod Creation

Pods are the basic building blocks of Kubernetes clusters. Each pod contains at least one container, which runs an application. In other words, if you're using Kubernetes, you're using pods.

While RBAC ensures that only authorized users can create pods, it doesn't control what they can put in their pod definitions. Without proper [admission control](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/), authorized users can create pods with arbitrary images, which can contain arbitrary privileges and configurations. This can lead to privilege escalation attacks.

**Examples of Exploitation:**

- An attacker can create a pod with a malicious image that has root privileges, allowing them to gain root access to the Kubernetes node where the pod is running.
- An attacker can create a pod with an image that has the ability to escape the container and run arbitrary code on the Kubernetes node.
- An attacker can create a pod with an image that can exploit a vulnerability in the Kubernetes cluster, potentially gaining access to sensitive data or resources.

**Mitigation Strategies:**

- Use [admission control](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/) to restrict the types of pods that can be created.
- Implement security policies to restrict the privileges of pods.
- Scan container images for vulnerabilities before running them in production.
- Monitor your Kubernetes cluster for suspicious activity.

## ▶️ Mounting a Service Account Token

Pods can be configured to [mount the authorization token](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#use-the-default-service-account-to-access-the-api-server) for a service account within the same namespace. This means that an attacker could create a pod with a malicious image that steals the token from a high-privileged service account. The attacker could then use this token to perform API actions and escalate their privileges.

**Mitigation Strategies:**

- Only mount service account tokens to pods that need them.
- Use security policies to restrict the privileges of pods.

## ▶️ Unauthorized Cluster Node Access: Risks and Mitigations

If you allow entities to create highly privileged containers without comprehensive admission control, you are creating security vulnerabilities. This can result in the creation of vulnerable Pods that enable attackers to gain access to the corresponding container and potentially infiltrate the Cluster's underlying node.

**Risks of Unauthorized Cluster Node Access:**

- An attacker typically follows a two-step process: gaining access to the container and then executing traditional container escape techniques. Such an attack can have severe consequences within Kubernetes environments.
- Access to any Cluster node is a significant breach. With node access, an attacker can leverage the container engine to access ServiceAccount tokens from other Pods on the same node, potentially compromising the security of the entire Cluster.
- Additionally, the attacker can search for application data and configuration files on the node, exposing critical parts of the Cluster. They can also identify and target unrelated network hosts and services like DNS Servers.

**Mitigation Strategies:**

- Implement strict admission control.
- Continuous monitoring and auditing.
- Network segmentation and access control lists.

## ▶️ Secret Access in Kubernetes: Risks and Mitigations

It is important to grant the permission to read Secrets with caution, as it is a very powerful permission. In Kubernetes, Secrets can be used to store application-critical configuration data, as well as authorization tokens for ServiceAccounts.

**Risks of Unauthorized Secret Access:**

- If an attacker is able to read Secrets, they could steal authorization tokens and essentially take over the corresponding ServiceAccounts. This could give them access to sensitive data, the ability to launch attacks against other nodes in the cluster, or disrupt the cluster's operations.

**Mitigation Strategies:**

- Implement strict Role-Based Access Control (RBAC) policies to restrict who can read Secrets.
- Use a secrets management tool to encrypt Secrets at rest and in transit.
- Monitor for suspicious activity, such as a large number of failed attempts to read Secrets.

## ▶️ Impersonation in Kubernetes

Impersonation in Kubernetes is a mechanism that allows an entity to act as another entity while performing API requests. This can be useful for administrators to test configurations or troubleshoot problems. However, attackers can also use impersonation to gain unauthorized access to the Kubernetes cluster or its resources.

**How Impersonation Works:**

- Impersonation is done by adding the `Impersonate-User` header to the API request. The value of the header is the name of the entity that the user wants to impersonate. Kubernetes first checks whether impersonation is allowed for the target entity. If it is, Kubernetes proceeds as if the impersonated entity made the request.

**Impersonating Service Accounts:**

- To impersonate a service account, the `Impersonate-User` header must be set to the following value:
    ```
    Impersonate-User: system:serviceaccount:<namespace>:<service-account-name>
    ```
    For example, to impersonate the default service account in the default namespace, the header would be set to:
    ```
    Impersonate-User: system:serviceaccount:default:default
    ```

**Risks of Impersonation:**

- Impersonation can be a very powerful tool for attackers. If an attacker is able to impersonate a privileged entity, they could gain access to sensitive data, delete resources, or disrupt the operation of the Kubernetes cluster.

**Mitigation Strategies:**

- Implement strict Role-Based Access Control (RBAC) policies to restrict who can impersonate entities.
- Monitor for suspicious activity, such as a large number of failed attempts to impersonate entities.
- Educate users about the risks of impersonation and how to avoid them.

## ▶️ Rolebinding Permissions in Kubernetes: Implications and Safeguards

The `bind` verb in Kubernetes allows an entity to assign a Role or ClusterRole to a subject (e.g., a user, group, or service account). This is a powerful permission, as it allows the entity to grant itself new permissions.

**Binding Roles:**

- If an entity has the permission to create RoleBindings and the permission to bind Roles, it can assign arbitrary Roles to itself and elevate its privileges depending on the Roles available in the namespace in which these permissions are available.

**Binding ClusterRoles within a Namespace:**

- If an entity has the permission to create RoleBindings and the permission to bind ClusterRoles, it can bind the permissions of a ClusterRole to the respective namespace. This is generally a greater privilege escalation than the first variant, as it allows the entity to gain the permissions of any ClusterRole, regardless of which namespace it is defined in.

**Binding ClusterRoles Cluster-wide:**

- Finally, if an entity has the permission to create ClusterRoleBindings and the permission to bind ClusterRoles, it can gain the highest possible permissions within the Cluster by binding the permissions of the most privileged entities within the `kube-system` namespace to itself.

**Risks of Binding Roles and ClusterRoles:**

- If an attacker gains the permission to bind Roles or ClusterRoles, they could elevate their privileges and gain access to sensitive data or disrupt the operation of the Kubernetes cluster.

## Mitigation Strategies

- Implement strict Role-Based Access Control (RBAC) policies to restrict who can bind Roles and ClusterRoles.
- Monitor for suspicious activity, such as a large number of attempts to bind Roles or ClusterRoles.
- Educate users about the risks of binding Roles and ClusterRoles and how to avoid them.

📒 **Privilege Escalation Prevention and Bootstrapping**

The RBAC API prevents users from escalating privileges by editing roles or role bindings. Because this is enforced at the API level, it applies even when the RBAC authorizer is not in use.

📒 **Restrictions on Role Creation or Update**

You can only create/update a role if at least one of the following conditions is true:

- **You already have all the permissions contained in the role**, at the same scope as the object being modified (cluster-wide for a ClusterRole, within the same namespace or cluster-wide for a Role).
- **You are granted explicit permission** to perform the `escalate` verb on the roles or clusterroles resource in the `rbac.authorization.k8s.io` API group.

For example, if `user-1` does not have the ability to list Secrets cluster-wide, they cannot create a ClusterRole containing that permission. To allow a user to create/update roles:

1. **Grant them a role** that allows them to create/update Role or ClusterRole objects, as desired.
2. **Grant them permission** to include specific permissions in the roles they create/update:
    - **Implicitly**, by giving them those permissions (if they attempt to create or modify a Role or ClusterRole with permissions they themselves have not been granted, the API request will be forbidden).
    - **Explicitly**, by giving them permission to perform the `escalate` verb on roles or clusterroles resources in the `rbac.authorization.k8s.io` API group.

For more details, refer to the [Kubernetes RBAC documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).


📒 **Restrictions on Role Binding Creation or Update**

You can only create/update a role binding if you already have all the permissions contained in the referenced role (at the same scope as the role binding) or if you have been authorized to perform the `bind` verb on the referenced role. 

For example, if `user-1` does not have the ability to list Secrets cluster-wide, they cannot create a `ClusterRoleBinding` to a role that grants that permission. 

To allow a user to create/update role bindings:

1. **Grant them a role** that allows them to create/update `RoleBinding` or `ClusterRoleBinding` objects, as desired.
2. **Grant them permissions needed to bind a particular role:**
    - **Implicitly**, by giving them the permissions contained in the role.
    - **Explicitly**, by giving them permission to perform the `bind` verb on the particular Role (or ClusterRole).

For more details, refer to the [Kubernetes RBAC documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

For example, this ClusterRole and RoleBinding would allow user-1 to grant other users the admin, edit, and view roles in the namespace user-1-namespace:


```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: role-grantor
rules:
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["rolebindings"]
  verbs: ["create"]
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["clusterroles"]
  verbs: ["bind"]
  # omit resourceNames to allow binding any ClusterRole
  resourceNames: ["admin","edit","view"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: role-grantor-binding
  namespace: user-1-namespace
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: role-grantor
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: User
  name: user-1
```

**📜 Bootstrapping Initial Roles and Role Bindings**

When bootstrapping the first roles and role bindings, it is necessary for the initial user to grant permissions they do not yet have. To bootstrap initial roles and role bindings:

- **Use a credential with the `system:masters` group**, which is bound to the `cluster-admin` super-user role by the default bindings.

For more details, refer to the [Kubernetes RBAC documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

## 🏁 Conclusion

In this blog post, we have discussed three of the most common security threats to Kubernetes environments:

- **Unauthorized access to Cluster nodes**
- **Impersonation**
- **Binding Roles and ClusterRoles**

We have also provided some recommendations on how to mitigate these risks.

🔐 **Key Takeaway:** Security is a continuous process. There is no single solution that will protect your Kubernetes cluster from all threats. However, by implementing a layered security approach and following the recommendations in this blog post, you can help to reduce your risk and protect your Kubernetes environment.

For further reading, check out the [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/overview/).

