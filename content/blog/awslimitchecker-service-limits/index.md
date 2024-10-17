---
id: 928f3bc59d874ce436d58381
path: "/blog/awslimitchecker-service-limits/"
date: "2024-10-17 18:06:00"
published: true
title: "Stay within bounds: Using AwsLimitChecker to manage AWS Service limits"
cover: "./limitschecker-cover.jpg"
excerpt: "How to proactively manage AWS service limits using AwsLimitChecker, ensuring your applications stay within bounds and avoid disruptions."
keywords:
  - AWS Service limits
  - AWS cloud
  - AwsLimitChecker
  - Proactive management
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Proactive AWS Service Limit Management**

## 💡 Introduction

Nowadays, we rely on Amazon Web Services (AWS) for a lot of our cloud-based stuff at Peak. But as we grow and use more AWS services, it can get pretty tricky to keep an eye on everything. AWS gives us some helpful tools to make it easier, and in this article, we're going to check them out.

Now, think about it this way: when we use AWS services, we need to ensure we don't exceed resource limits or hit any restrictions. That's where [awslimitchecker](https://github.com/jantman/awslimitchecker/tree/master) comes in.

In this blog, we'll dive into how [awslimitchecker](https://github.com/jantman/awslimitchecker/tree/master) helps us effectively manage [AWS service limits](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) and maintain the robustness of our cloud infrastructure.

![Alt text](./intro.jpg)

## 📌 Checking AWS Service Limits

In the world of AWS, keeping tabs on your service limits is crucial, but it can be challenging. In this section, we introduce [awslimitchecker](https://github.com/jantman/awslimitchecker), a powerful tool that acts as both a script and a Python module. It assesses your AWS service limits and resource usage, alerting you when you approach these limits. Discover how this tool bridges the gap between AWS's default limits, API-based limits, Service Quotas data, and Trusted Advisor insights to help you avoid hitting those limits at the most inconvenient times.

## 🔊 Efficient AWS Resource Monitoring

AWS service limits can be a roadblock when scaling your services. While Amazon's Trusted Advisor provides some assistance, its monitoring scope is limited, and it only sends weekly alerts. Moreover, the Service Quotas service can be helpful but has its limitations. [awslimitchecker](https://github.com/jantman/awslimitchecker) steps in to offer a comprehensive solution. It's not just about monitoring; it allows you to override default service limits, define custom thresholds, and access usage details efficiently. In this section, we explore how awslimitchecker empowers AWS users with precise resource monitoring and control.

## ⚙️ Flexible Configuration and integration

[awslimitchecker](https://github.com/jantman/awslimitchecker) is versatile. It goes beyond the basics by allowing you to set custom thresholds, specify AWS regions, and even assume roles in other AWS accounts. Plus, it can fetch limits from various sources, including Trusted Advisor and individual service APIs. If you want to integrate awslimitchecker into your monitoring stack, it offers options to send metrics to stores like Datadog and issue alerts through services like PagerDuty. This section dives into the flexibility and customization capabilities of awslimitchecker.

## 📚 Nomenclature Simplified

- ✅ **Service**: In AwsLimitChecker, a "Service" refers to an AWS product or service, like EC2, VPC, RDS, or ElastiCache. Each AWS service corresponds to a distinct AWS API.
- ✅ **Limit**: AWS sets maximum usage limits, called "Limits," for various resource types. These limits can be either account-wide or per-region and have global default values. AWS Support can increase these limits upon request. In this documentation, "Limit" also describes specific AWS limit objects within the program.
- ✅ **Usage**: Usage represents your current utilization of a resource with a limit. Usage values are numerical (e.g., the number of VPCs or GB of IOPS-provisioned storage). Usage is tracked per resource, making it easy to identify issues.
- ✅ **Threshold**: This is the point at which AwsLimitChecker flags current usage as problematic. Default thresholds are set globally: usage >= 80% triggers a "warning," while usage >= 99% triggers a "critical" alert. Exceeded thresholds are reported separately for warnings and critical alerts. You can override these defaults both globally and on a per-limit basis for finer control.

## 🔍 Requirements for usage

Before you embark on your AWS service limit management journey with awslimitchecker, there are some prerequisites to consider. You can either use Docker or set it up directly with Python 3.8 or newer. Additionally, you'll need Python 🐍 VirtualEnv and pip for smooth installation. We'll guide you through these requirements to ensure you're ready to leverage awslimitchecker's potential effectively.

### 🔧 Simplified Installation

There are several ways to install awslimitchecker, each offering flexibility and convenience to suit your preferences and use cases.

### 🏷️ Versions and Tags

To ensure stability and prevent unexpected issues, awslimitchecker follows a clear versioning policy. You can choose between stability and prompt updates based on your preferences. Pinning your installation to a major version guarantees compatibility with your IAM policy and dependencies while avoiding backward-incompatible changes.

### 🚀 Basic usage

If you prefer not to use Docker, consider installing awslimitchecker within a virtual environment ([virtualenv](https://virtualenv.pypa.io/en/latest/) / [venv](https://docs.python.org/3/library/venv.html)). This approach keeps your environment isolated and manageable. For automated tooling, like Jenkins or cron jobs, pin your installation to a specific major version to prevent unexpected disruptions.

```shell
virtualenv limitchecker
source limitchecker/bin/activate
pip install awslimitchecker
```

### 🚀 Docker usage

Starting with version 7.1.0, awslimitchecker offers an official Docker image for a hassle-free installation experience. Whether you're running it locally or within a Docker-based system like AWS ECS, this Docker image is designed to meet your needs.

**Running awslimitchecker with Docker**

You can run awslimitchecker within a Docker container as well. To show help, use the following command:

```shell
docker run jantman/awslimitchecker --help
```

Or to show the current limits for the ELB service, when using credentials from environment variables:

```shell
docker run -e AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN jantman/awslimitchecker -l -S ELB
```

**Example output**

```shell
ELB/Application load balancers                  1500 (API)
ELB/Certificates per application load balancer  25
ELB/Classic load balancers                      1500 (API)
ELB/Listeners per application load balancer     50 (API)
ELB/Listeners per load balancer                 100 (API)
ELB/Listeners per network load balancer         50 (API)
ELB/Network load balancers                      20 (API)
ELB/Registered instances per load balancer      1000 (API)
ELB/Rules per application load balancer         100 (API)
ELB/Target groups                               3000 (API)

awslimitchecker 7.0.0 is AGPL-licensed free software; all users have a right to the full source code of this version. See [awslimitchecker on GitHub](https://github.com/jantman/awslimitchecker).
```

## 🔐 Managing AWS Credentials

`awslimitchecker` relies on `boto3` for handling credentials, leaving the intricate details to the AWS library itself. To use `awslimitchecker` effectively, ensure that your AWS credentials are configured properly. This can be achieved by either having your credentials defined in one of `boto3`'s supported configuration files or by setting them as environment variables.

If your AWS credentials reside in the cross-SDK credentials file (`~/.aws/credentials`) under a named profile section, you can utilize those credentials by specifying the `-P` / `--profile` command-line option. Refer to [boto3 config](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html) and this project's documentation for further information.

Notably, version 0.3.0 of `awslimitchecker` introduced a transition from using `boto` to `boto3` as its AWS API client. While this shift is mostly seamless, there is a minor alteration in how AWS credentials are managed. With `boto`, if the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables were set, and the region was not explicitly specified in `awslimitchecker`, the AWS region defaulted to either the `AWS_DEFAULT_REGION` environment variable or `us-east-1`. This was regardless of whether a configuration file (`~/.aws/credentials` or `~/.aws/config`) was present. In contrast, with `boto3`, the default region from the configuration file takes precedence, even if credentials come from environment variables.

When employing Security Token Service (STS) credentials, you'll need to specify the `-r` / `--region` option alongside the `-A` / `--sts-account-id` and `-R` / `--sts-account-role` options to indicate the Account ID to assume a role in and the role's name.


## 🔐 AWS Credentials in Docker

Running `awslimitchecker` in a Docker container may require some adjustments in how you provide your AWS credentials. Here are different methods depending on where your credentials are located:

### 🌐 AWS Credential Environment Variables

If your AWS credentials are set as environment variables, you'll need to explicitly pass them to the container:

```shell
docker run \
    -e AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION \
    -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
    jantman/awslimitchecker --version
```

### 📁 AWS Credentials File

If your AWS credentials reside in the AWS Credentials File (typically at `~/.aws/credentials`), you should mount it into the container at `/root/.aws/credentials`:

```shell
docker run \
    -v $(readlink -f ~/.aws/credentials):/root/.aws/credentials \
    jantman/awslimitchecker --version
```

![Docker](https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png)

### EC2 Instance Profile or Task Role Credentials

For credentials provided via an EC2 Instance Profile (Role) or an ECS Task Role, they should be automatically recognized, as long as there are no explicit barriers preventing Docker containers from accessing them. You may still need to set the `AWS_DEFAULT_REGION` environment variable for the container.

## 🛡️ Trusted Advisor

`awslimitchecker` supports retrieving your current service limits via the [Trusted Advisor "Service Limits"](https://docs.aws.amazon.com/awssupport/latest/user/service-limits.html) performance check for limits which Trusted Advisor tracks (currently a subset of what `awslimitchecker` knows about). The results of this check may not be available via the API for all accounts; as of December 2016, the Trusted Advisor documentation states that while this check is available for all accounts, API access is only available to accounts with Business- or Enterprise-level support plans. If your account does not have Trusted Advisor access, the API call will result in a `SubscriptionRequiredException` and `awslimitchecker` will log a `Cannot check TrustedAdvisor` message at warning level.

Trusted Advisor information is important to `awslimitchecker`, however, as it provides the current service limit values for a number of limits that cannot be obtained any other way. While you can completely disable Trusted Advisor polling via the `--skip-ta` command-line option, you will then be left with default service limit values for many limits.

## 📊 Service Quotas Service

AWS' new [Service Quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) service provides a unified interface to retrieve current limits from many AWS services. These limit values are second only to the services' own APIs (for the services that provide limit information via API), and are much more current and complete than the information provided by Trusted Advisor. The introduction of Service Quotas should greatly reduce the number of limits that need to be retrieved from Trusted Advisor or specified manually.

## 🔐 Required IAM Permissions

The required IAM policy output by `awslimitchecker` includes only the permissions required to check limits and usage. If you are loading limit overrides and/or threshold overrides from S3, you will need to run `awslimitchecker` with additional permissions to access those objects.

You can view a sample IAM policy listing the permissions required for `awslimitchecker` to function properly either via the CLI client:

```shell
awslimitchecker --iam-policy
```

Below is the sample IAM policy from this version of `awslimitchecker`, listing the IAM permissions required for it to function correctly. Please note that in some cases `awslimitchecker` may cause AWS services to make additional API calls on your behalf (such as when enumerating ElasticBeanstalk resources, the ElasticBeanstalk service itself will make `s3:ListBucket` and `s3:GetBucketLocation` calls). The policy below includes only the bare minimum permissions for `awslimitchecker` to function properly, and does not include permissions for any side-effect calls made by AWS services that do not affect the results of this program.

```json
{
    "Statement": [
        {
            "Action": [
                "acm:ListCertificates",
                "apigateway:GET",
                "apigateway:HEAD",
                "apigateway:OPTIONS",
                "autoscaling:DescribeAccountLimits",
                "autoscaling:DescribeAutoScalingGroups",
                "autoscaling:DescribeLaunchConfigurations",
                "cloudformation:DescribeAccountLimits",
                "cloudformation:DescribeStacks",
                "cloudfront:ListCachePolicies",
                "cloudfront:ListCloudFrontOriginAccessIdentities",
                "cloudfront:ListDistributions",
                "cloudfront:ListKeyGroups",
                "cloudfront:ListOriginRequestPolicies",
                "cloudtrail:DescribeTrails",
                "cloudtrail:GetEventSelectors",
                "cloudwatch:GetMetricData",
                "ds:GetDirectoryLimits",
                "dynamodb:DescribeLimits",
                "dynamodb:DescribeTable",
                "dynamodb:ListTables",
                "ec2:DescribeAccountAttributes",
                "ec2:DescribeAddresses",
                "ec2:DescribeInstances",
                "ec2:DescribeInternetGateways",
                "ec2:DescribeNatGateways",
                "ec2:DescribeNetworkAcls",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribeReservedInstances",
                "ec2:DescribeRouteTables",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeSnapshots",
                "ec2:DescribeSpotDatafeedSubscription",
                "ec2:DescribeSpotFleetInstances",
                "ec2:DescribeSpotFleetRequestHistory",
                "ec2:DescribeSpotFleetRequests",
                "ec2:DescribeSpotPriceHistory",
                "ec2:DescribeSubnets",
                "ec2:DescribeVolumes",
                "ec2:DescribeVpcs",
                "ec2:DescribeVpnGateways",
                "ecs:DescribeClusters",
                "ecs:DescribeServices",
                "ecs:ListClusters",
                "ecs:ListServices",
                "eks:DescribeCluster",
                "eks:DescribeFargateProfile",
                "eks:ListClusters",
                "eks:ListFargateProfiles",
                "eks:ListNodegroups",
                "elasticache:DescribeCacheClusters",
                "elasticache:DescribeCacheParameterGroups",
                "elasticache:DescribeCacheSecurityGroups",
                "elasticache:DescribeCacheSubnetGroups",
                "elasticbeanstalk:DescribeApplicationVersions",
                "elasticbeanstalk:DescribeApplications",
                "elasticbeanstalk:DescribeEnvironments",
                "elasticfilesystem:DescribeFileSystems",
                "elasticloadbalancing:DescribeAccountLimits",
                "elasticloadbalancing:DescribeListeners",
                "elasticloadbalancing:DescribeLoadBalancers",
                "elasticloadbalancing:DescribeRules",
                "elasticloadbalancing:DescribeTargetGroups",
                "firehose:ListDeliveryStreams",
                "iam:GetAccountSummary",
                "kinesis:DescribeLimits",
                "lambda:GetAccountSettings",
                "rds:DescribeAccountAttributes",
                "rds:DescribeDBInstances",
                "rds:DescribeDBParameterGroups",
                "rds:DescribeDBSecurityGroups",
                "rds:DescribeDBSnapshots",
                "rds:DescribeDBSubnetGroups",
                "rds:DescribeEventSubscriptions",
                "rds:DescribeOptionGroups",
                "rds:DescribeReservedDBInstances",
                "redshift:DescribeClusterSnapshots",
                "redshift:DescribeClusterSubnetGroups",
                "route53:GetHostedZone",
                "route53:GetHostedZoneLimit",
                "route53:ListHostedZones",
                "s3:ListAllMyBuckets",
                "servicequotas:ListServiceQuotas",
                "ses:GetSendQuota",
                "sts:GetCallerIdentity",
                "support:DescribeTrustedAdvisorCheckRefreshStatuses",
                "support:DescribeTrustedAdvisorCheckResult",
                "support:DescribeTrustedAdvisorCheckSummaries",
                "support:DescribeTrustedAdvisorChecks",
                "support:RefreshTrustedAdvisorCheck",
                "trustedadvisor:Describe*",
                "trustedadvisor:RefreshCheck"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ],
    "Version": "2012-10-17"
}
```

## 🚀 Deployment on ECS Fargate using Terraform

An example Terraform module, and an example of using the module, to deploy Dockerized `awslimitchecker` on ECS Fargate with the PagerDuty alert provider and the Datadog metrics store, along with an example Datadog monitor to detect if `awslimitchecker` hasn't run in over a day, is available in the [GitHub repo](https://github.com/jantman/awslimitchecker/tree/master).

## 🏁 Conclusion

`awslimitchecker` is a valuable tool for AWS users seeking to manage service limits and resource usage effectively. With its easy installation, robust credential management, and flexibility, it empowers users to stay within limits, avoid unexpected disruptions, and optimize their AWS environments. Whether you're a seasoned AWS pro or just starting, `awslimitchecker` is a must-have in your AWS toolkit to maintain control and stay ahead of potential limitations.

We hope that you have found this blog post helpful. If you have any other tips or tricks that you would like to share, please leave a comment below.

https://giphy.com/gifs/theoffice-TNnyxINX87VAKbNYmZ

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
