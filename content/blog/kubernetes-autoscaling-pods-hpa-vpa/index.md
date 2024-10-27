---
id: 58af1812eaa1a9302e171699
path: "/blog/kubernetes-autoscaling-pods-hpa-vpa/"
date: "2024-10-27 20:00:00"
published: true
title: "Kubernetes Autoscaling: Achieving Scalability and Efficiency"
cover: "./hpa-vpa-cover.png"
excerpt: "Learn how to effectively scale your Kubernetes pods both vertically and horizontally using Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA) for optimal resource utilization."
keywords:
  - Kubernetes
  - Autoscaling
  - HPA & VPA
  - SRE
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **How to Scale Pods Vertically and Horizontally in Kubernetes 🌐**

## 🐳 Introduction

[Kubernetes](https://kubernetes.io/) embodies resilience and scalability by deploying diverse pods with varying resource allocations, ensuring application redundancy. While manual adjustments suffice, Kubernetes elevates scaling with Horizontal Pod Autoscaling (HPA). This self-regulating loop dynamically expands or contracts resources (app Pods) based on real-time demands. Simply deploy a [HorizontalPodAutoscaler (HPA)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) resource for auto-scaling, leaving the automation to it.

Moreover, in addition to HPA, the [Vertical Pod Autoscaler (VPA)](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler) offers a distinct approach. Unlike HPA's horizontal scaling, VPA modifies a Pod's resources.requests, prompting the Kubernetes Scheduler to shift Pods across WorkerNodes as needed. VPA incessantly monitors container resource usage, automatically tweaking requests to prevent waste and ensure sufficient CPU and memory allocation. This synergy of HPA and VPA empowers Kubernetes users to effortlessly achieve efficient, tailored scaling.

This blog explores the universe of Kubernetes autoscaling, casting a spotlight on these two powerful tools: HPA and VPA. We'll uncover how they work, their distinctions, and how they can collaborate to enhance resource utilization and application performance.

Join us on a quest to become proficient in the art of scaling within Kubernetes.

![hpa-vpa](./hpa-vpa.jpg)

## 📈 HorizontalPodAutoscaler (HPA): Scaling Horizontally

Under the hood, HPA is powered by a dedicated Kubernetes controller. You create an HPA YAML targeting your app's Deployment and use `kubectl` to apply it.

## 📉 Vertical Pod Autoscaler (VPA): Scaling Vertically

VPA involves three pods:

- **Recommender**: [Analyzes](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/pkg/recommender/README.md) Pod resource usage and recommends CPU/memory requests.
- **Updater**: [Monitors](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/pkg/updater/README.md) and aligns Pod requests with recommendations, recreating if needed.
- **Admission-plugin**: [Sets](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/pkg/admission-controller/README.md) request values for new/updated Pods.

### ⚠️ VPA Limitations

- VPA doesn't oversee Pod recreation post-eviction, needing tools like Cluster Autoscaler.
- It can't be used with HPA for CPU/memory scaling, but custom metrics are compatible.
- VPA's Pod recreation might cause service downtime without fault-tolerant solutions.

HPA and VPA require a [metrics server](https://github.com/kubernetes-sigs/metrics-server), like Kubernetes Metrics Server, to gather CPU/memory metrics for scaling decisions.

### 📊 Metrics API Types

- **metrics.k8s.io**: Default metrics, provided by the [metrics-server](https://github.com/kubernetes-sigs/metrics-server).
- **custom.metrics.k8s.io**: Metrics provided by adapters from inside a cluster, e.g., [Microsoft Azure Adapter](https://github.com/Azure/azure-k8s-metrics-adapter), [Google Stackdriver](https://github.com/GoogleCloudPlatform/k8s-stackdriver), [Prometheus Adapter](https://github.com/kubernetes-sigs/prometheus-adapter).
- **external.metrics.k8s.io**: Similar to the Custom Metrics API, but metrics are provided by an external system, such as [AWS CloudWatch](https://aws.amazon.com/cloudwatch/).

In a nutshell, `metrics.k8s.io` encompasses default metrics from the metrics-server, while `custom.metrics.k8s.io` involves internal cluster adapters like Microsoft Azure or Google Stackdriver, and `external.metrics.k8s.io` pertains to external systems like AWS CloudWatch, providing adaptable metrics.

## ☁️ Deploy Metrics Server Using Helm

To initiate the process, integrate the metrics-server repository into your helm package collection. Employ the `helm repo add` command as follows:

```shell
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server
```

Then, employ `helm repo update` to refresh the pool of accessible packages:

```shell
$ helm repo update metrics-server

Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "metrics-server" chart repository
Update Complete. ⎈Happy Helming!⎈

$ helm search repo metrics-server
```

### ☸️ Repository Integration Complete: Metrics Server Deployment

With the repository successfully added to Helm, you're poised to include metrics-server in your Kubernetes deployments. Here's how you can create your deployment configuration:

Clone the Kubernetes Starter Kit Git repository:

```shell
git clone https://github.com/seifrajhi/K8s-Workload-Scaling-Strategies.git
```

Locate the metrics-server configuration in the following path:

```shell
cd K8s-Workload-Scaling-Strategies
vim assets/manifests/metrics-server-values-v3.11.0.yaml
```

By following these steps, you'll seamlessly integrate metrics-server into your Kubernetes environment and have the flexibility to tailor your deployment configuration to your needs.

It contains a few stock parameters. Note that replicas is a fixed value, 2.

```shell
## Ref: https://github.com/kubernetes-sigs/metrics-server/blob/metrics-server-helm-chart-3.8.2/charts/metrics-server
# Number of metrics-server replicas to run
replicas: 2

apiService:
    # Specifies if the v1beta1.metrics.k8s.io API service should be created.
    create: true

hostNetwork:
    # Specifies if metrics-server should be started in hostNetwork mode.
    enabled: false
```

You can check the Metrics Server chart page for explanations of the available values for metrics-server.

Then, you can install the Kubernetes Metrics Server using Helm (a dedicated metrics-server namespace will be created as well):

```shell
helm install metrics-server metrics-server/metrics-server --version 3.11.0\
    --namespace metrics-server \
    --create-namespace \
    -f "assets/manifests/metrics-server-v3.11.0.yaml"
```

This will deploy metrics-server to your configured Kubernetes cluster.

After deploying, you can use `helm ls` to verify that metrics-server has been added to your deployment:

```shell
helm ls -n metrics-server
```

Next, you can check the status of all of the Kubernetes resources deployed to the metrics-server namespace:

```shell
kubectl get all -n metrics-server
```

Finally, check if the `kubectl top` command works (similar to Linux top command - prints current resource usage, such as CPU and memory). Below command displays current resource usage for all Pods in the kube-system namespace:

```shell
kubectl top pods -n kube-system
```

You have now deployed metrics-server into your Kubernetes cluster. In the next step, you'll review some of the parameters of a HorizontalPodAutoscaler Custom Resource Definition.

## Introducing HPAs: The Key to Dynamic Scaling

So far, you've been manually configuring the number of pods in your Kubernetes deployments. This is fine for simple cases, but it can be a pain to keep up with as your application grows and traffic fluctuates.

That's where **HorizontalPodAutoscalers (HPAs)** come in. HPAs are a Kubernetes feature that automatically scales your deployments up or down based on metrics like CPU usage and memory utilization. This means that you can focus on building great applications, and let HPAs take care of the scaling for you.

### How an HPA Works

1. **Metric Monitoring**: The HPA watches a metric, such as CPU usage.
2. **Threshold Exceeded**: When the metric exceeds a threshold, the HPA triggers a scale operation.
3. **Scaling**: The scale operation either increases or decreases the number of pods in the deployment.

### HPA CRD (Custom Resource Definition)

The HPA CRD is a YAML file that specifies the configuration of the HPA. The CRD includes the following fields:

- **Target**: The name of the Kubernetes object that the HPA is monitoring.
- **Metrics**: The metrics that the HPA is watching.
- **Scaling Policies**: The rules for how the HPA scales the deployment.

Here's an example of an HPA CRD:

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
    name: demo-hpa
spec:
    scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: my-deployment
    minReplicas: 1
    maxReplicas: 3
    metrics:
        - type: Resource
            resource:
                name: cpu
                target:
                    type: Utilization
                    averageUtilization: 80
```

### Explanation of the Configuration

- **spec.scaleTargetRef**: Specifies the Kubernetes object that the HPA is monitoring. In this case, it is the `my-deployment` deployment.
- **spec.minReplicas**: Specifies the lower limit for the number of replicas in the deployment. The HPA will never scale the deployment down below 1 pod.
- **spec.maxReplicas**: Specifies the upper limit for the number of replicas in the deployment. The HPA will never scale the deployment up above 3 pods.
- **spec.metrics.type**: Specifies the type of metric that the HPA is using to calculate the desired replica count. Here, it is using the `Resource` type, which means it is scaling the deployment based on the average CPU utilization.
- **spec.metrics.resource.name**: Specifies the name of the resource that the HPA is monitoring. In this case, it is the `cpu` resource.
- **spec.metrics.resource.averageUtilization**: Specifies the threshold value for the metric. The HPA will scale the deployment up if the average CPU utilization exceeds 80%.

### Creating an HPA

There are two ways to create an HPA for your application deployment. You can use the `kubectl autoscale` command on an existing deployment, or you can create an HPA YAML manifest.

#### Using `kubectl autoscale` Command

To create an HPA using the `kubectl autoscale` command, you need to specify the name of the deployment and the target CPU utilization. For example, the following command would create an HPA for the `myapp-test` deployment with a target CPU utilization of 80%:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: myapp-test
spec:
    selector:
        matchLabels:
            run: myapp-test
    replicas: 1
    template:
        metadata:
            labels:
                run: myapp-test
        spec:
            containers:
                - name: busybox
                    image: busybox
                    resources:
                        limits:
                            cpu: 50m
                        requests:
                            cpu: 20m
                    command: ["sh", "-c"]
                    args:
                        - while [ 1 ]; do
                            echo "Test";
                            sleep 0.01;
                            done
```

Note the last few lines of this file. They contain some shell syntax to repeatedly print "Test" a hundred times a second, to simulate load. Once you are done reviewing the file, you can deploy it into your cluster using `kubectl`:

```shell
kubectl apply -f assets/manifests/hpa/metrics-server/myapp-test.yaml
```

Finally, create a HorizontalPodAutoscaler targeting the `myapp-test` deployment:

```shell
kubectl autoscale deployment hpa-test --cpu-percent=80 --min=1 --max=3
```

You can check if the HPA resource was created by running:

```shell
kubectl get hpa
```

The `TARGETS` column of the output will eventually show a figure of current usage%/target usage%.

You can also observe the logged events that an HPA generates by using:

```shell
kubectl describe hpa hpa-test
```

In a real-world scenario, you will want to use a dedicated YAML manifest to define each HPA. This way, you can track the changes by having the manifest committed in a Git repository, as well as come back to it later and perform changes.

### Scaling Applications Automatically with Metrics Server

In this last step, you will experiment with two different ways of generating server load and scaling your applications automatically via a YAML manifest.

#### Application Deployment

One way to generate server load is to create an application deployment that performs some CPU-intensive computations. This will cause the pods in the deployment to use more CPU resources, which will trigger the HorizontalPodAutoscaler (HPA) to scale the deployment up.

#### Shell Script

Another way to generate server load is to use a shell script. This script can be configured to perform fast successive HTTP calls to a web application. This will cause the web application to use more CPU resources, which will also trigger the HPA to scale the deployment up.

#### Constant Load Test

In this scenario, you will create a sample application that performs some CPU-intensive computations. This application is implemented in Python and is included in one of the example manifests from the starter kit. You can open the manifest, called `constant-load.yaml`, using nano or your favorite text editor.

The manifest defines a deployment that creates a pod that runs the Python application. The application will continuously perform CPU-intensive computations, which will cause the pod to use more CPU resources. This will trigger the HorizontalPodAutoscaler (HPA) to scale the deployment up.

Once you have opened the manifest, you can edit it to change the number of replicas in the deployment. The default number of replicas is 1, but you can increase this number to create more pods. The more pods you create, the more CPU resources will be used, and the more the HPA will scale the deployment up.

Once you have edited the manifest, you can save it and apply it to your cluster using the `kubectl apply` command:

```shell
kubectl apply -f assets/manifests/hpa/metrics-server/constant-load.yaml
```

Once the manifest has been applied, the HPA will start monitoring the CPU usage of the deployment. If the CPU usage exceeds the target utilization, the HPA will scale the deployment up to add more pods.

Verify that the deployment was created successfully, and that it's up and running:

```shell
kubectl get deployments
```

Next, you will need to deploy another HorizontalPodAutoscaler (HPA) to this cluster. There is an example HPA that is matched to this scenario in the file `constant-load-hpa.yaml`.

The `constant-load-hpa.yaml` file defines an HPA that monitors the CPU usage of the constant-load deployment. The HPA will scale the deployment up if the CPU usage exceeds the target utilization, which is set to 80% by default.

```shell
cat assets/manifests/hpa/metrics-server/constant-load-hpa.yaml
```

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
    name: constant-load
spec:
    scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: constant-load-deployment
    minReplicas: 1
    maxReplicas: 3
    metrics:
        - type: Resource
            resource:
                name: cpu
                target:
                    type: Utilization
                    averageUtilization: 80
```

```shell
kubectl apply -f constant-load-hpa.yaml
```

Once the HPA has been applied, it will start monitoring the CPU usage of the constant-load deployment. If the CPU usage exceeds the target utilization, the HPA will scale the deployment up to add more pods.

## Running Vertical Pod Autoscaler

For the VPA to work, it relies on the Kubernetes Metrics Server to get a Pod's CPU/Memory values. However, it can also use Prometheus. See [How can I use Prometheus for the VPA recommender](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#using-prometheus).

### 🛠️ Installing Vertical Pod Autoscaler

Let's use the Helm chart `cowboysysop/vertical-pod-autoscaler`:

```shell
helm repo add cowboysysop https://cowboysysop.github.io/charts/
helm -n kube-system upgrade --install vertical-pod-autoscaler cowboysysop/vertical-pod-autoscaler
```

Then, you can check VPA's Pods:

```shell
kubectl -n kube-system get pod -l app.kubernetes.io/name=vertical-pod-autoscaler
```

And its CustomResourceDefinitions:

```shell
kubectl get crds
NAME                                                   CREATED AT
verticalpodautoscalercheckpoints.autoscaling.k8s.io  2023-08-26T10:45:46Z
verticalpodautoscalers.autoscaling.k8s.io            2023-08-26T10:45:46Z
```

Now everything is ready to start using it.

### 📄 Examples of Work with Vertical Pod Autoscaler

In the [VPA repository](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler), there is a directory named `vpa`, which contains examples of manifests. In the `hamster.yaml` file, there is an example of a configured VPA and a test Deployment. But let's create our manifests and deploy resources separately.

#### 🐹 First, Describe a Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: hamster
spec:
    selector:
        matchLabels:
            app: hamster
    replicas: 2
    template:
        metadata:
            labels:
                app: hamster
        spec:
            securityContext:
                runAsNonRoot: true
                runAsUser: 65534 # nobody
            containers:
                - name: hamster
                    image: registry.k8s.io/ubuntu-slim:0.1
                    resources:
                        requests:
                            cpu: 100m
                            memory: 50Mi
                    command: ["/bin/sh"]
                    args:
                        - "-c"
                        - "while true; do timeout 0.5s yes >/dev/null; sleep 0.5s; done"
```

Here we have to create two Pods with requests at 100 Milli CPU and 50 Megabyte memory. Deploy it:

```shell
kubectl apply -f assets/manifests/vpa/hamster.yaml
deployment.apps/hamster created
```

A few minutes later, check the resources that are actually consumed by the Pods:

```shell
kubectl top pod
NAME                       CPU(cores)   MEMORY(bytes)
hamster-65cd4dd797-fq9lq   498m         0Mi
hamster-65cd4dd797-lnpks   499m         0Mi
```

#### Now, Add a VPA

```yaml
apiVersion: "autoscaling.k8s.io/v1"
kind: VerticalPodAutoscaler
metadata:
    name: hamster-vpa
spec:
    targetRef:
        apiVersion: "apps/v1"
        kind: Deployment
        name: hamster
    resourcePolicy:
        containerPolicies:
            - containerName: '*'
                minAllowed:
                    cpu: 100m
                    memory: 50Mi
                maxAllowed:
                    cpu: 1
                    memory: 500Mi
                controlledResources: ["cpu", "memory"]
```

Deploy it:

```shell
kubectl apply -f assets/manifests/vpa/vpa.yaml
verticalpodautoscaler.autoscaling.k8s.io/hamster-vpa created
```

Check the VPA object:

```shell
kubectl get vpa
NAME         MODE CPU MEM PROVIDED AGE
hamster-vpa   Auto                 14s
```

And in a minute or two, the Recommender starts working:

```shell
kubectl get vpa
NAME          MODE  CPU   MEM     PROVIDED AGE
hamster-vpa   Auto  587m  262144k  True    43s
```

And in another minute, check the Updater work — it kills old Pods to apply new recommended values for the requests:

```shell
kubectl get pod
NAME                       READY   STATUS        RESTARTS   AGE
hamster-65cd4dd797-fq9lq   1/1     Terminating   0          3m43s
hamster-65cd4dd797-hc9cn   1/1     Running       0          13s
hamster-65cd4dd797-lnpks   1/1     Running       0          3m43s
```

Check the value requests of the new Pod:

```shell
kubectl get pod hamster-65cd4dd797-hc9cn -o yaml | yq '.spec.containers[].resources'
{
    "requests": {
        "cpu": "587m",
        "memory": "262144k"
    }
}
```

That's all for now. 🎉

## 📕 Closing Notes

Kubernetes autoscaling is a pivotal strategy for achieving seamless scalability and operational efficiency in your containerized applications. By mastering the art of vertical and horizontal pod autoscaling, you unlock the ability to adapt to varying workloads while optimizing resource utilization. Whether it's boosting performance through vertical scaling or accommodating increased traffic with horizontal scaling, Kubernetes provides the tools to strike a balance between performance and cost-effectiveness. Harness the power of autoscaling to elevate your applications, ensuring they effortlessly meet user demands and resource constraints in today's dynamic computing landscape.

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
