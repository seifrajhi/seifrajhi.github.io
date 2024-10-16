---
id: 93bc475d115b5952b44a9bbd
path: "/blog/aws-x-ray-distributed-tracing/"
date: "2024-10-16 21:00:00"
published: true
title: "Enabling distributed tracing for containerized apps with AWS X-Ray"
cover: "./xray-cover.png"
excerpt: "Learn how to enable distributed tracing for containerized applications using AWS X-Ray, providing end-to-end performance visibility and insights into your workloads on AWS."
keywords:
  - AWS EKS
  - Distributed tracing
  - AWS X-Ray
  - Containerized applications
  - Performance visibility
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **End-to-end performance visibility of containerized Workloads on AWS🔥**

## 📌 Introduction

[AWS X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html) is a distributed tracing service that provides deep insights into how containerized applications perform on AWS. 

By instrumenting your containers with the X-Ray SDK and deploying the X-Ray daemon, you can gain end-to-end visibility into requests flowing through your containerized services running on ECS or EKS.

> X-Ray creates detailed trace maps that show how requests are processed across multiple components, helping you identify performance bottlenecks, debug issues, and optimize your containerized applications.

In this post, we'll explore how to enable X-Ray tracing for containers on ECS and EKS, the key concepts and components involved, and best practices for instrumenting and deploying your containerized workloads with X-Ray.


## Tracing with AWS X-Ray

[X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html) creates detailed trace maps that show how requests are processed across multiple components, helping you identify performance bottlenecks, debug issues, and optimize your containerized applications. It integrates seamlessly with other AWS services like API Gateway, Lambda, EKS, ECS, and more to provide a comprehensive view of your distributed architecture.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3peeq41tyum7hx5ljt7a.png)

### Instrumenting Containerized Applications with AWS X-Ray

Instrumenting your containerized application for X-Ray tracing involves sending trace data for incoming and outbound requests, along with metadata about each request.

This is done by integrating the X-Ray SDK into your application code. Many instrumentation scenarios require only configuration changes, such as instrumenting all incoming HTTP requests and downstream calls to AWS services.

There are several SDKs, agents, and tools that can be used to instrument your application for X-Ray tracing, depending on the language and framework you are using.

Once instrumented, your application will send trace data to the X-Ray daemon, which collects and processes the data before sending it to the X-Ray service.

## Hands-On example

The first step is to install x-ray in our cluster. Let's use the [okgolove/aws-xray](https://github.com/okgolove/helm-charts/tree/master/charts/aws-xray) Helm chart.
Add the okgolove Helm repository.

```shell
$ helm repo add okgolove https://okgolove.github.io/helm-charts/
```

Create a `xray-values.yaml` file, see the default values in values.yaml:

```yaml
serviceAccount:
  annotations: 
    eks.amazonaws.com/role-arn: arn:aws:iam::*********:role/XRayAccessRole
    name: aws-xray
xray:
  region: eu-west-1
  loglevel: pro
```

In order for the X-Ray daemon to communicate with the service, we should to create a Kubernetes service account and attach an AWS Identity and Access Management (IAM) role and policy with necessary permissions.

For this, we will use eksctl

```shell
eksctl create iamserviceaccount --name aws-xray \
--namespace xray --role-name XRayAccessRole --cluster aws-xray \ 
--attach-policy-arn arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess \
--approve --override-existing-serviceaccounts
```

Install the chart into the cluster, this will create a DaemonSet and a Service:

```shell
$ helm -n xray install aws-xray okgolove/aws-xray -f xray-values.yaml
```

This will deploy the X-Ray DaemonSet to the EKS cluster. The X-Ray daemon will be deployed to each worker node in the EKS cluster. 
For reference, see the example implementation used in this module.

### Checking X-Ray in action:


The AWS X-Ray SDKs are used to instrument your microservices. When using the DaemonSet in the example implementation, you need to configure it to point to `aws-xray.xray:2000`.

The following showcases how to configure the X-Ray SDK for Go. This is merely an example and not a required step in the workshop.

```shell
func init() {
  xray.Configure(xray.Config{
      DaemonAddr:     "aws-xray.xray:2000",
      LogLevel:       "info",
  })
}
```

We now have the foundation in place to deploy microservices, which are instrumented with X-Ray SDKs, to the EKS cluster.

In this step, we are going to deploy example front-end and back-end  microservices to the cluster.

> The example services are already instrumented using the X-Ray SDK for Go. Currently, X-Ray has SDKs for Go, Python, Node.js, Ruby, .NET and Java.

```shell
git clome https://github.com/seifrajhi/aws-xray-eks-containers-tracing.git
cd aws-xray-eks-containers-tracing/
kubeclt apply -f backend/x-ray-sample-back-k8s.yml
kubectl apply -f frontend/x-ray-sample-front-k8s.yml
```

To review the status of the deployments, you can run:

```shell
$ kubectl describe deployments x-ray-sample-front-k8s x-ray-sample-back-k8s
```

For the status of the services, run the following command:

```shell
kubectl describe services x-ray-sample-front-k8s x-ray-sample-back-k8s
```

Once the front-end service is deployed, run the following command to get the Elastic Load Balancer (ELB) endpoint and open it in a browser.

```shell
kubectl get service x-ray-sample-front-k8s -o wide
```

After your ELB is deployed and available, open up the endpoint returned by the previous command in your browser and allow it to remain open. The front-end application makes a new request to the /api endpoint once per second, which in turn calls the back-end service. 
The JSON document displayed in the browser is the result of the request made to the back-end service.

We now have the example microservices deployed, so we are going to investigate our Service Graph and Traces in X-Ray section of the AWS Management Console.

The Service map in the console provides a visual representation of the steps identified by X-Ray for a particular trace. Each resource that sends data to X-Ray within the same context appears as a service in the graph.

Next, go to the traces section in the AWS Management Console to view the execution times for the segments in the requests. At the top of the page, we can see the URL for the ELB endpoint and the corresponding traces below.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9mdd2ry811mz9kn200s4.png)

If you click on the link on the left in the Trace list section you will see the overall execution time for the request (0.5ms for the x-ray-sample-front-k8s which wraps other segments and subsegments), as well as a breakdown of the individual segments in the request. 
In this visualization, you can see the front-end and back-end segments and a subsegment named x-ray-sample-back-k8s-gen In the back-end service source code, we instrumented a subsegment that surrounds a random number generator.

In the Go example, the main segment is initialized in the xray.Handler helper, which in turn sets all necessary information in the http.Request context struct, so that it can be used when initializing the subsegment.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p8pyq9snjctsuib6cerm.png)

## Conclusion

AWS X-Ray provides valuable end-to-end visibility into containerized applications on ECS and EKS, enabling teams to optimize performance, identify issues, and deliver reliable services. By instrumenting containers with the X-Ray SDK and deploying the daemon, developers can easily trace requests across microservices and AWS resources. The intuitive X-Ray console allows quick analysis of trace data for comprehensive insights.
As containerized architectures grow in complexity, X-Ray is a must-have tool for maintaining high-quality, performant applications on AWS.

**References:**

- https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html
- https://aws.amazon.com/blogs/compute/application-tracing-on-kubernetes-with-aws-x-ray/
- https://aws-observability.github.io/observability-best-practices/guides/containers/aws-native/eks/container-tracing-with-aws-xray/
- https://archive.eksworkshop.com/intermediate/245_x-ray/
  
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
