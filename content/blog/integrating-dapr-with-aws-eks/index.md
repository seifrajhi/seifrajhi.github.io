---
id: 6491e1d2389461b00e45328e
path: "/blog/integrating-dapr-with-aws-eks/"
date: "2024-11-02 18:30:00"
published: true
title: "Speed Up Microservices Development with Dapr on AWS EKS"
cover: "./daper-eks-cover.png"
excerpt: "Learn how to accelerate your microservices development on AWS EKS using Dapr. Simplify and secure your distributed applications with ease."
keywords:
  - Dapr
  - AWS EKS
  - Microservices
  - Kubernetes
  - AWS
  - Distributed Applications
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Use Dapr to Build Distributed Applications Easily on Kubernetes 🎩**

## 🐳 Introduction

[Building distributed](https://en.wikipedia.org/wiki/Distributed_computing) applications means creating software that runs on multiple computers within a network, working together to achieve a common goal. This involves coordinating various components or modules that might be spread across different infrastructures.

Organizations often opt for distributed applications for two main reasons. First, they allow multiple development teams to work independently while contributing to a larger system. Second, they enable the integration of components built with different programming languages, enhancing interoperability.

This flexibility is important in today's diverse tech landscape, where different teams might prefer different tools and languages.

However, developing distributed applications comes with several challenges. Ensuring that numerous components work together fluently requires careful attention to resiliency (the ability to recover from failures), [observability](https://en.wikipedia.org/wiki/Observability_(software)) (monitoring the system's health), security, and scalability across various services and runtimes.

Additionally, these applications often interact with [message brokers](https://en.wikipedia.org/wiki/Message_broker) (like [Kafka](https://kafka.apache.org/) or [RabbitMQ](https://www.rabbitmq.com/)), [data stores](https://en.wikipedia.org/wiki/Data_store) (like databases), and external services (like third-party APIs), necessitating a thorough understanding of specific APIs and SDKs, which adds to the complexity. The need for robust error handling, efficient load balancing, and seamless service discovery further complicates the development process.

In this blog, we will explore how the open-source [Dapr](https://dapr.io/) (Distributed Application Runtime) can assist us in building reliable and secure distributed applications. Dapr provides a set of building blocks for common microservice patterns, such as service invocation (calling services), state management (handling data), and [pub/sub messaging](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) (publish/subscribe communication), which can significantly reduce the development effort.

By using Dapr’s built-in best practices and patterns, we will also highlight common use cases for Dapr on [AWS EKS](https://aws.amazon.com/eks/) (Elastic Kubernetes Service), demonstrating how it can simplify and enhance your microservices architecture. This approach not only speeds up development but also ensures that your applications are scalable and maintainable.

> For more on Dapr, [check out Part 1 of our series](https://seifrajhi.github.io/blog/dapr-kubernetes-event-driven-runtime-part1/). You can also learn more about [Kubernetes](https://kubernetes.io/), [AWS EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html), and [microservices architecture](https://martinfowler.com/articles/microservices.html) to deepen your understanding of the concepts discussed in this post.

## 🚀 What is Dapr and Why Do We Need It?

[Dapr](https://dapr.io/) (Distributed Application Runtime) is an open-source project designed to simplify the development of microservices. It provides a set of building blocks that address common challenges in building distributed applications, such as service-to-service communication, state management, and pub/sub messaging.

### 🌟 Main Features of Dapr

![Dapr Features](image.png)

1. **Service Invocation**:
    - Dapr makes it easy for microservices to communicate with each other. Instead of writing custom code to handle HTTP or gRPC calls, you can use Dapr's [Service Invocation](https://docs.dapr.io/developing-applications/building-blocks/service-invocation/) API. This API abstracts the complexity and provides built-in retries, timeouts, and error handling. The [middleware components](https://docs.dapr.io/concepts/components-concept/#middleware) are used with the service invocation building block.

2. **State Management**:
    - Managing state in a distributed system can be complex. Dapr provides a [State Management API](https://docs.dapr.io/developing-applications/building-blocks/state-management/) that allows you to store and retrieve state across different services. This API supports various state stores like Redis, DynamoDB, and Cosmos DB, making it flexible and easy to use.

3. **Publish/Subscribe Messaging**:
    - For event-driven architectures, Dapr offers a [Pub/Sub API](https://docs.dapr.io/developing-applications/building-blocks/pubsub/). This allows services to publish events and other services to subscribe to them, enabling asynchronous communication. You can integrate with message brokers like AWS SNS, SQS, and Kafka without changing your application code.

4. **Bindings**:
    - Dapr supports input and output bindings to interact with external systems. This means you can easily connect to databases, message queues, and other services using Dapr's [Binding API](https://docs.dapr.io/developing-applications/building-blocks/bindings/).

5. **Workflow**:
    - Dapr provides a built-in [workflow](https://docs.dapr.io/developing-applications/building-blocks/workflow/) feature to orchestrate logic across various microservices.

6. **Actors**:
    - Dapr supports the actor model, allowing you to encapsulate code and data in reusable actor objects, which is a common microservices design pattern.

7. **Secrets Management**:
    - Security is a critical aspect of any distributed system. Dapr includes features like mutual TLS (mTLS) for secure service-to-service communication and [secret management](https://docs.dapr.io/developing-applications/building-blocks/secrets/) to handle sensitive information like API keys and database credentials.

8. **Configuration**:
    - Dapr provides a [Configuration API](https://docs.dapr.io/developing-applications/building-blocks/configuration/) to manage and be notified of application configuration changes.

9. **Distributed Lock**:
    - Dapr offers a [Distributed Lock API](https://docs.dapr.io/developing-applications/building-blocks/distributed-lock/) to provide mutually exclusive access to shared resources from an application.

10. **Cryptography**:
     - Dapr includes a [Cryptography API](https://docs.dapr.io/developing-applications/building-blocks/cryptography/) to perform cryptographic operations without exposing keys to your application.

11. **Jobs**:
     - Dapr provides a [Jobs API](https://docs.dapr.io/developing-applications/building-blocks/jobs/) to manage the scheduling and orchestration of jobs.

By leveraging these features, Dapr simplifies the development of distributed applications, allowing developers to focus on writing business logic rather than dealing with the complexities of distributed systems. This leads to faster development cycles, more reliable applications, and easier maintenance.

### ❓ Why Do We Need Dapr?

Developing distributed applications involves several challenges:

- **Complex Communication**: Ensuring reliable communication between services can be difficult, especially when dealing with different protocols and error handling.
- **State Management**: Keeping track of state across multiple services requires a consistent and reliable approach.
- **Event-Driven Architecture**: Implementing pub/sub messaging patterns can be complex and requires integration with various message brokers.
- **External Integrations**: Connecting to external systems like databases and third-party APIs often involves writing boilerplate code.
- **Observability**: Monitoring and diagnosing issues in a distributed system requires comprehensive logging, metrics, and tracing.
- **Security**: Ensuring secure communication and managing secrets are essential for protecting your application.
- **Isolation**: Dapr namespacing provides isolation and multi-tenancy across many capabilities, giving greater security. Typically applications and components are deployed to namespaces to provide isolation in a given environment, such as Kubernetes.

Dapr addresses these challenges by providing a set of standardized APIs and components that simplify the development process. By using Dapr, developers can focus on writing business logic instead of dealing with the complexities of distributed systems. This leads to faster development cycles, more reliable applications, and easier maintenance.

For more details, [check the official documentation](https://docs.dapr.io/concepts/overview/).

## 🛠️ How-To: Invoke Services Using Middleware Component

![Service Invocation](image-1.png)

In this section, we'll demonstrate how to deploy services with unique application IDs, allowing other services to discover and call endpoints using Dapr's service invocation over HTTP.

### 🆔 Step 1: Choose an ID for Your Service

Dapr allows you to assign a global, unique ID for your app. This ID encapsulates the state for your application, regardless of the number of instances it may have.

### 🛠️ Step 2: Set an App-ID When Deploying to Kubernetes

In Kubernetes, set the `dapr.io/app-id` annotation on your pod:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: my-app
    namespace: default
    labels:
        app: my-app
spec:
    replicas: 1
    selector:
        matchLabels:
            app: my-app
    template:
        metadata:
            labels:
                app: my-app
            annotations:
                dapr.io/enabled: "true"
                dapr.io/app-id: "order-processor"
                dapr.io/app-port: "6001"
                dapr.io/app-protocol: "http"  # Use "https" if your app uses TLS
```

### 📡 Step 3: Invoke the Service

To invoke an application using Dapr, you can use the invoke API on any Dapr instance. The sidecar programming model encourages each application to interact with its own instance of Dapr. The Dapr sidecars discover and communicate with one another.

Below is an example in Python that leverages Dapr SDKs for service invocation:

```python
import random
from time import sleep
import logging
import requests
import json

base_url = "http://localhost:3500/v1.0/invoke/order-processor/method"
headers = {'Content-Type': 'application/json'}

logging.basicConfig(level=logging.INFO)

while True:
        sleep(random.randrange(50, 5000) / 1000)
        order_id = random.randint(1, 1000)
        order = {'orderId': order_id, 'item': 'laptop', 'quantity': 1}
        
        # Invoke a service
        result = requests.post(
                url=f'{base_url}/orders',
                data=json.dumps(order),
                headers=headers
        )
        
        logging.info(f'Order requested: {order_id}')
        logging.info(f'Result: {result.text}')
```

### 🌐 Additional URL Formats

To invoke a `GET` endpoint:

```shell
curl http://localhost:3500/v1.0/invoke/order-processor/method/orders/100
```

Dapr provides multiple ways to call the service invocation API:

- Change the address in the URL to `localhost:<dapr-http-port>`.
- Add a `dapr-app-id` header to specify the ID of the target service, or alternatively pass the ID via HTTP Basic Auth: `http://dapr-app-id:<service-id>@localhost:3500/path`.

For example, the following command:

```shell
curl http://localhost:3500/v1.0/invoke/order-processor/method/orders/100
```

is equivalent to:

```shell
curl -H 'dapr-app-id: order-processor' 'http://localhost:3500/orders/100' -X GET
```

or:

```shell
curl 'http://dapr-app-id:order-processor@localhost:3500/orders/100' -X GET
```

Using CLI:

```shell
dapr invoke --app-id order-processor --method orders/100
```

### 🔍 Including a Query String in the URL

You can append a query string or a fragment to the end of the URL, and Dapr will pass it through unchanged. For example:

```shell
curl 'http://dapr-app-id:order-processor@localhost:3500/orders/100?basket=1234&key=abc' -X GET
```

### 🏷️ Using Namespaces

When running on namespace-supported platforms, include the namespace of the target app in the app ID. For example, use `order-processor.production`.

Invoking the service with a namespace would look like:

```shell
curl http://localhost:3500/v1.0/invoke/order-processor.production/method/orders/100 -X GET
```

This example demonstrates how to use Dapr's service invocation to call services securely and efficiently within a Kubernetes environment. For more details, check the [official Dapr documentation](https://docs.dapr.io/developing-applications/building-blocks/service-invocation/). Let me know if you need any further details or adjustments!

## Demo: Set Up an AWS EKS Cluster and App test

In this section, we'll walk you through setting up an Elastic Kubernetes Service (EKS) cluster and deploying a sample application to test Dapr integration.

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- `kubectl`
- `AWS CLI`
- `eksctl`
- An existing VPC and subnets

### 🔐 Authenticating to AWS

To interact with AWS services like DynamoDB from your EKS pods, you need to ensure that your pods have the necessary permissions. This can be achieved using IAM Roles for Service Accounts (IRSA) or a pod identity agent.

#### Using IAM Roles for Service Accounts (IRSA)

1. **Create an IAM Role**: Create an IAM role with the necessary permissions for accessing AWS services. Attach the required policies to this role.

    ```shell
    aws iam create-role --role-name EKS-DynamoDB-Role --assume-role-policy-document file://trust-policy.json
    aws iam attach-role-policy --role-name EKS-DynamoDB-Role --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
    ```

    The `trust-policy.json` should contain the trust relationship allowing EKS to assume this role:

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "eks.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
        }
      ]
    }
    ```

2. **Associate the IAM Role with a Kubernetes Service Account**:

    ```shell
    eksctl create iamserviceaccount \
      --name my-service-account \
      --namespace default \
      --cluster my-cluster \
      --attach-role-arn arn:aws:iam::<AWS_ACCOUNT_ID>:role/EKS-DynamoDB-Role \
      --approve
    ```

3. **Update Your Pod Specification**: Update your pod specification to use the service account:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: my-pod
    spec:
      serviceAccountName: my-service-account
      containers:
      - name: my-container
        image: my-image
    ```

#### Using a Pod Identity Agent

1. **Deploy the Pod Identity Agent**: Follow the installation instructions to deploy the agent to your EKS cluster.

2. **Annotate Your Pods**: Annotate your pods with the IAM role to be assumed:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: my-pod
      annotations:
        iam.amazonaws.com/role: EKS-DynamoDB-Role
    spec:
      containers:
      - name: my-container
        image: my-image
    ```

By following these steps, you can ensure that your EKS pods have the necessary permissions to interact with AWS services securely.

### 🛠️ Step 1: Deploy an EKS Cluster

1. **Log into AWS**:

    ```shell
    aws configure
    ```

2. **Create an EKS Cluster**:

    To create an EKS cluster, use the following command. You can specify a specific version of Kubernetes using the `--version` flag (1.13.x or newer version required).

    ```shell
    eksctl create cluster --name dapre-eks-demo --region eu-west-1 --version 1.30 --vpc-private-subnets subnet-12345,subnet-67890 --without-nodegroup
    ```

    Adjust the `--vpc-private-subnets` values to meet your requirements. You can also specify public subnets by changing `--vpc-private-subnets` to `--vpc-public-subnets`.

3. **Verify `kubectl` Context**:
    Ensure your `kubectl` context is set to the new EKS cluster.

    ```shell
    kubectl config current-context
    ```

4. **Update Security Group Rules**:
    Allow the EKS cluster to communicate with the Dapr sidecar by creating an inbound rule for port `4000`.

    ```shell
    aws ec2 authorize-security-group-ingress --region eu-west-1 \
    --group-id sg-0123456789abcdef0 \
    --protocol tcp \
    --port 4000 \
    --source-group sg-0123456789abcdef0
    ```

### Step 2: Deploy Sample Applications

First, we need to clone the repo that has the code snippet:

```shell
git clone https://github.com/dapr/quickstarts.git
cd quickstarts/tutorials/hello-kubernetes
```

Then, we need to set up Dapr dev mode on our Kubernetes cluster.

Follow the steps below to deploy Dapr to Kubernetes using the `--dev` flag.

> **Note**: Any previous Dapr installations in the Kubernetes cluster need to be uninstalled first. You can use `dapr uninstall -k` to remove Dapr.

With the `dapr init -k --dev` command, the CLI will also install the `Redis` and `Zipkin` containers `dapr-dev-redis` and `dapr-dev-zipkin` in the `default` namespace apart from the Dapr control plane in the `dapr-system` namespace.

The `statestore`, `pubsub`, and `appconfig` default components and configuration are applied in the default Kubernetes namespace if they do not exist.

You can use `dapr components -k` and `dapr configurations -k` to see these.

For more details, check the [official Dapr documentation](https://docs.dapr.io/getting-started/).

```shell
dapr init -k --dev
Expected output in a fresh Kubernetes cluster without Dapr installed:

⌛  Making the jump to hyperspace...
ℹ️  Note: To install Dapr using Helm, see here: https://docs.dapr.io/getting-started/install-dapr-kubernetes/#install-with-helm-advanced

ℹ️  Container images will be pulled from Docker Hub
✅  Deploying the Dapr control plane with latest version to your cluster...
✅  Deploying the Dapr dashboard with latest version to your cluster...
✅  Deploying the Dapr Redis with 17.14.5 version to your cluster...
✅  Deploying the Dapr Zipkin with latest version to your cluster...
ℹ️  Applying "statestore" component to Kubernetes "default" namespace.
ℹ️  Applying "pubsub" component to Kubernetes "default" namespace.
ℹ️  Applying "appconfig" zipkin configuration to Kubernetes "default" namespace.
✅  Success! Dapr has been installed to namespace dapr-system. To verify, run `dapr status -k' in your terminal. To get started, go here: https://aka.ms/dapr-getting-started
```

**🐍 Deploy the Python App**

Next, we deploy the Python app. This is a basic Python app that posts JSON messages to `localhost:3500`, the default listening port for Dapr. You can invoke the Node.js application's `neworder` endpoint by posting to `v1.0/invoke/nodeapp/method/neworder`. The message contains some data with an `orderId` that increments once per second:

```python
import time
import requests

n = 0
dapr_url = "http://localhost:3500/v1.0/invoke/nodeapp/method/neworder"

while True:
    n += 1
    message = {"data": {"orderId": n}}

    try:
        response = requests.post(dapr_url, json=message)
        print(response.json())
    except Exception as e:
        print(e)

    time.sleep(1)
```

To deploy the Python app to the Kubernetes cluster:

```shell
kubectl apply -f ./deploy/python.yaml
```

**🟢 Deploy the Node.js App**

To deploy the Node.js app to Kubernetes, use the following command:

```shell
kubectl apply -f ./deploy/node.yaml
```

This will deploy the Node.js app to Kubernetes. The Dapr control plane will automatically inject the Dapr sidecar to the Pod. If you take a look at the `node.yaml` file, you will see how Dapr is enabled for that deployment:

- `dapr.io/enabled: true` - This tells the Dapr control plane to inject a sidecar to this deployment.
- `dapr.io/app-id: nodeapp` - This assigns a unique ID or name to the Dapr application, so it can be sent messages to and communicated with by other Dapr apps.
- `dapr.io/enable-api-logging: "true"` - This is added to `node.yaml` file by default to see the API logs.

You'll also see the container image that you're deploying. If you want to update the code and deploy a new image, see the **Next Steps** section.

**🔄 Accessing the Kubernetes Service**

There are several different ways to access a Kubernetes service depending on which platform you are using. Port forwarding is one consistent way to access a service, whether it is hosted locally or on a cloud Kubernetes provider like AKS.

```shell
kubectl port-forward service/nodeapp 8080:80
```

This will make your service available on `http://localhost:8080`.

**Configure the Redis Statestore Component**

Apply the `redis.yaml` file and observe that your state store was successfully configured!

```shell
kubectl apply -f ./deploy/redis.yaml
```

**📜 Viewing Logs**

Now that the Node.js and Python applications are deployed, watch messages come through:

**Node.js App Logs**

Get the logs of the Node.js app:

```shell
kubectl logs --selector=app=node -c node --tail=-1
```

If all went well, you should see logs like this:

```shell
Got a new order! Order ID: 1
Successfully persisted state for Order ID: 1
Got a new order! Order ID: 2
Successfully persisted state for Order ID: 2
Got a new order! Order ID: 3
Successfully persisted state for Order ID: 3
```

**API Call Logs**

Observe API call logs:

**Node.js App API Logs**

Get the API call logs of the Node.js app:

```shell
kubectl logs --selector=app=node -c daprd --tail=-1
```

When save state API calls are made, you should see logs similar to this:

```shell
time="2024-11-02T22:46:09.82121774Z" level=info method="POST /v1.0/state/statestore" app_id=nodeapp instance=nodeapp-7dd6648dd4-7hpmh scope=dapr.runtime.http-info type=log ver=1.7.2
time="2024-11-02T22:46:10.828764787Z" level=info method="POST /v1.0/state/statestore" app_id=nodeapp instance=nodeapp-7dd6648dd4-7hpmh scope=dapr.runtime.http-info type=log ver=1.7.2
```

**Python App API Logs**

Get the API call logs of the Python app:

```shell
kubectl logs --selector=app=python -c daprd --tail=-1
```

```shell
time="2024-11-02T02:47:49.972688145Z" level=info method="POST /neworder" app_id=pythonapp instance=pythonapp-545df48d55-jvj52 scope=dapr.runtime.http-info type=log ver=1.7.2
time="2024-11-02T02:47:50.984994545Z" level=info method="POST /neworder" app_id=pythonapp instance=pythonapp-545df48d55-jvj52 scope=dapr.runtime.http-info type=log ver=1.7.2
```

**✅ Confirm Successful Persistence**

Call the Node.js app's order endpoint to get the latest order. Grab the external IP address that you saved before, append `/order`, and perform a GET request against it (enter it into your browser, use Postman, or curl it!):

```shell
curl $NODE_APP/order
{"orderID":"42"}
```

You should see the latest JSON in response!

This will spin down each resource defined by the `.yaml` files in the `deploy` directory, including the state component.

> **Note**: This will also delete the state store component. If the `--dev` flag was used for Dapr init, and you want to use the `dapr-dev-redis` deployment as state store, replace the `redisHost` value inside `./deploy/redis.yaml` with `dapr-dev-redis-master:6379` and also the `secretKeyRef`, `name` with `dapr-dev-redis`. Then run the command `kubectl apply -f ./deploy/redis.yaml`, to apply the file again. This will create a `statestore` Dapr component pointing to `dapr-dev-redis` deployment.

For more details, check the [official Dapr documentation](https://docs.dapr.io/getting-started/).

## 🏁 Conclusion

In this blog post, we explored how Dapr can significantly simplify the development and management of distributed applications on AWS EKS. By leveraging Dapr's building blocks, such as service invocation, state management, and pub/sub messaging, developers can focus more on business logic and less on the complexities of distributed systems.

We demonstrated how to set up an AWS EKS cluster, deploy sample applications, and integrate Dapr to enhance microservices architecture. This approach not only accelerates development but also ensures that your applications are scalable, secure, and maintainable.

Dapr's open-source nature and extensive documentation make it an excellent choice for organizations looking to streamline their microservices development on Kubernetes. Whether you are just starting with microservices or looking to optimize your existing architecture, Dapr provides the tools and best practices to help you succeed.

For more information and detailed guides, be sure to check out the [official Dapr documentation](https://docs.dapr.io/).

Happy coding! 🚀

<br>

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**


🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
