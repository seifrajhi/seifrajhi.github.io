---
id: 982140dd4ee567c9c222e3ff
path: "/blog/kubernetes-cli-kubectl-tips-tricks/"
date: "2024-10-24 19:36:00"
published: true
title: "Kubernetes CLI — kubectl — Tips and Tricks That You May Not Know"
cover: "./tips-cover.jpg"
excerpt: "Explore how Kubernetes Admission Controllers enhance security and control within your clusters, providing a comprehensive guide to their implementation and benefits."
keywords:
  - Kubernetes
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Tips and tricks to help you master the Kubernetes CLI.**

## ⏯ Overview

Are you tired of spending hours trying to figure out how to use the Kubernetes CLI? Do you wish there was a way to make your life easier? If so, then you're in luck! In this blog post, we'll share some of the most helpful Kubernetes CLI tips and tricks that we know. These tips will save you time, frustration, and headaches.

We'll also show you how to master the Kubernetes CLI in just a few easy steps. By the end of this blog post, you'll be a Kubernetes CLI ninja! 🥷

## 🤖 Tips that will save you time

If you're looking for ways to save time with the Kubernetes CLI, look no further! We present you with a collection of tips that will boost your productivity and enable you to accomplish your work more swiftly.

https://giphy.com/gifs/the-it-crowd-chris-odowd-1C8bHHJturSx2

1. **Use aliases and tab completion feature:**
    Aliases are a great way to shorten kubectl commands. For example, you could create an alias for the `kubectl get pods` command as `k get pods`. This can save you a lot of time if you use kubectl frequently.
    By enabling tab completion, you can quickly navigate through commands, resources, and flags without having to remember or type them entirely.
    To set up tab completion, refer to the [Kubernetes documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#optional-kubectl-configurations-and-plugins) or your shell's specific instructions, and enjoy the ease of command exploration and input. 📚

2. **Use `kubectl explain` to get more information about a Kubernetes resource:**
    The `kubectl explain` command is a gem in the Kubernetes CLI toolbox. It can be used to get more information about a Kubernetes resource. This can be helpful if you are not sure what a particular resource does or how to configure it. For example, if you want to know more about the Deployment resource, you could run the following command:
    ```sh
    kubectl explain Deployment
    ```
    This will print out a detailed description of the Deployment resource, including its configuration options.

3. **Use `kubectl diff` to compare two Kubernetes manifests:**
    The `kubectl diff` command comes in handy when you want to compare the live state of your Kubernetes resources with their desired state declared in a YAML file.
    This can be helpful if you are making changes to a Kubernetes manifest and want to see what the changes will do before you apply them. For example, if you have a Kubernetes manifest called `my-manifest.yaml` and you want to see what changes would be made if you added a new pod to the manifest, you could run the following command:
    ```sh
    kubectl diff my-manifest.yaml
    ```
    This will print out a diff between the two manifests, showing you the differences between them.

https://giphy.com/gifs/reaction-moss-it-crowd-yqtpq8rqqXBh6

1. **Use `kubectl logs` to view the logs for a pod:**
    The `kubectl logs` command can be used to view the logs for a pod. This can be helpful if you are troubleshooting a problem with your application. For example, if you have a pod called `my-pod` and you want to see the logs for that pod, you could run the following command:
    ```sh
    kubectl logs my-pod
    ```
    This will print out the logs for the `my-pod` pod.

2. **Use `kubectl top` to view the resource usage for a pod or container:**
    The `kubectl top` command can be used to view the resource usage for a pod or container. This can be helpful if you are trying to optimize the performance of your application. For example, if you want to see the resource usage for the `my-pod` pod, you could run the following command:
    ```sh
    kubectl top my-pod
    ```
    This will print out the resource usage for the `my-pod` pod.

3. **Use `kubectl rollout` to deploy changes to your applications safely:**
    The `kubectl rollout` command allows you to manage and monitor rolling updates to your deployments. By using commands like `kubectl rollout status <deployment-name>` or `kubectl rollout history <deployment-name>`, you can track the progress and history of your deployments, easily roll back to previous versions if necessary, and ensure smooth updates without downtime.

4. **`kubectl events` command to view events that have occurred in your Kubernetes cluster:**
    When you run `kubectl events`, it retrieves the latest events for various Kubernetes resources, such as pods, deployments, services, nodes, and more. These events provide information about the lifecycle of the resources, including their creation, deletion, updates, and other relevant status changes.
    The output of the `kubectl events` command typically includes the following details for each event:
    - **NAMESPACE:** The namespace in which the event occurred.
    - **LAST SEEN:** The timestamp indicating when the event was last observed.
    - **KIND:** The type of resource (e.g., Pod, Deployment, Service, Node, etc.).
    - **TYPE:** The type of event (e.g., Normal or Warning).
    - **REASON:** The reason for the event.

    The `kubectl events` command helps you monitor the progress and status of various resources in real-time. It can be particularly useful for troubleshooting issues, understanding resource behavior, tracking changes, and identifying any potential problems or errors.
    You can also filter the events based on specific resources or namespaces by using the appropriate flags with the `kubectl events` command. For example, you can run `kubectl events --namespace <namespace>` to view events only within a specific namespace.

5. **Kubernetes Resource Creation with `kubectl create`: The benefit of the `--dry-run` Flag:**
    The `kubectl create` command is used to create new Kubernetes resources. However, sometimes you may want to test a resource creation without actually executing it. This is where the `--dry-run` flag comes in.
    The `--dry-run=client -oyaml` flag tells kubectl to simulate the creation of a resource without actually creating it. This means that kubectl will print out the YAML configuration of the resource that would be created, but it will not actually create the resource.
    This is a valuable technique for testing and verifying your resource configurations before applying them. For example, you can use the `--dry-run=client -oyaml` flag to:
    - Validate your YAML configuration files.
    - Verify that the resource creation will succeed or encounter any issues.
    - Test the resource creation with different values.

    To use the `--dry-run=client` flag, simply pass it as an argument to the `kubectl create` or `kubectl run` command.

https://giphy.com/gifs/americanidol-katy-perry-american-idol-luke-bryan-IdrPndu51edqSiTJPg

## 📌 Key takeaways

In this blog post, we have covered some of the most useful tips and tricks for using the Kubernetes CLI. By following these tips, you can save yourself a lot of time and frustration when managing your Kubernetes clusters.
We have also shown you how to create aliases for frequently used commands, how to extend kubectl with raw outputs.


> We hope that you have found this blog post helpful. If you have any other tips or tricks that you would like to share, please leave a comment below.

https://giphy.com/gifs/buster-keaton-oscar-wilde-APHFMUIaTnLIA


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
