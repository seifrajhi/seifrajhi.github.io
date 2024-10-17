---
id: 42a7a3d28c37c8467c43cc4d
path: "/blog/eks-cloudtrail-audit-logs/"
date: "2024-10-17 15:06:00"
published: true
title: "Amazon EKS: Analyze control plane and CloudTrail logs for better detective controls"
cover: "./eks-audit-logs-cover.png"
excerpt: "How to use EKS control plane logs and AWS CloudTrail logs to gain visibility into your cluster’s activities, detect potential security threats, and investigate incidents."
keywords:
  - AWS EKS
  - Control plane logs
  - CloudTrail logs
  - Security monitoring
  - Incident investigation
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Get visibility into EKS activities and AWS API calls for better security monitoring**

## 📚 Introduction

In this blog post, we’ll explore how to use EKS control plane logs and AWS CloudTrail logs to gain visibility into your cluster’s activities, detect potential security threats, and investigate incidents.

## EKS Control Plane logs

Amazon EKS control plane logging sends audit and diagnostic logs directly to [CloudWatch Logs](https://aws.amazon.com/cloudwatch/) in your account, aiding in cluster security and management. Log types can be tailored to your needs and are organized into log streams for each Amazon EKS cluster in CloudWatch.

**Pricing:** Standard Amazon EKS pricing applies for cluster usage, along with CloudWatch Logs data ingestion and storage costs.

**Available log types:**

- **Kubernetes API server (api):** Exposes the Kubernetes API.
- **Audit (audit):** Records users, administrators, or system components impacting the cluster.
- **Authenticator (authenticator):** Handles Kubernetes RBAC authentication via IAM credentials.
- **Controller manager (controllerManager):** Manages core control loops.
- **Scheduler (scheduler):** Determines pod scheduling.

You can enable or disable each log type on a per-cluster basis using the [AWS Management Console](https://aws.amazon.com/console/), [AWS CLI](https://aws.amazon.com/cli/), or through the [Amazon EKS API](https://docs.aws.amazon.com/eks/latest/APIReference/Welcome.html).

## CloudTrail Logs

**CloudTrail** is enabled by default in your AWS account, recording activity including Amazon EKS events. Events can be viewed, searched, and downloaded in your AWS account. CloudTrail also documents interactions with AWS APIs by pods using IAM Roles for Service Accounts (IRSA), aiding in security auditing and compliance.

## Setup EKS Control Plane Logs

By default, cluster control plane logs aren't streamed to CloudWatch Logs. To enable logging for your cluster, you need to enable each log type individually. Note that CloudWatch Logs ingestion, archive storage, and data scanning rates apply to enabled control plane logs.

For more information on enabling control plane logs, refer to the [Amazon EKS User Guide](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html).

To check the status of EKS Control Plane Logs, run the following command:

```shell
aws eks describe-cluster --name eks-audit-logs-demo --query 'cluster.logging'
```

You'll receive output similar to this:

```json
{
    "clusterLogging": [
        {
            "types": [
                "api",
                "audit",
                "authenticator",
                "controllerManager",
                "scheduler"
            ],
            "enabled": true
        }
    ]
}
```

To update EKS Control Plane Logs, run this command:

```json
aws eks update-cluster-config --name eks-audit-logs-demo--logging '{"clusterLogging":[{"types":["api","audit","authenticator","controllerManager","scheduler"],"enabled":true}]}'
```

After you have enabled any of the control plane log types for your Amazon EKS cluster, you can view them on the CloudWatch console.

To learn more about viewing, analyzing, and managing logs in CloudWatch, see the [Amazon CloudWatch Logs User Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/).

Run the following command to view log-streams.

```shell
aws logs describe-log-streams --log-group-name /aws/eks/eks-audit-logs-demo/cluster --max-items 10 --order-by LastEventTime --query 'logStreams[].logStreamName'
```

The output contained **10 log streams** for log group `/aws/eks/eks-audit-logs-demo/cluster`

```json
[
    "kube-controller-manager-9ac68952bbfa494eb1625e2ff3f07bf7",
    "kube-controller-manager-96624a2fbc193d5ccd64f9f1ddbebbe3",
    "kube-apiserver-96624a2fbc193d5ccd64f9f1ddbebbe3",
    "kube-scheduler-96624a2fbc193d5ccd64f9f1ddbebbe3",
    "authenticator-9ac68952bbfa494eb1625e2ff3f07bf7",
    "cloud-controller-manager-9ac68952bbfa494eb1625e2ff3f07bf7",
    "kube-scheduler-9ac68952bbfa494eb1625e2ff3f07bf7",
    "authenticator-96624a2fbc193d5ccd64f9f1ddbebbe3",
    "kube-apiserver-audit-9ac68952bbfa494eb1625e2ff3f07bf7",
    "cloud-controller-manager-96624a2fbc193d5ccd64f9f1ddbebbe3"
]
```

### Query EKS Control Plane Logs Using CloudWatch Logs Insights

[CloudWatch Logs Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html) enables you to query and analyze your EKS Control Plane logs interactively within CloudWatch Logs. This functionality allows you to swiftly and effectively address operational challenges.

By executing queries, you can pinpoint potential causes of issues and verify the efficacy of implemented solutions. CloudWatch Logs Insights boasts a purpose-built query language equipped with straightforward yet robust commands, enhancing your ability to extract actionable insights from your log data.

The following covers multiple scenarios and their queries. To run these queries in the AWS Console:

1. Navigate to [CloudWatch Logs Insights](https://console.aws.amazon.com/cloudwatch/home#logsV2:logs-insights) in the console.
2. Select the Log Group `/aws/eks/eks-audit-logs-demo/cluster`.

### List create, update, and delete operations to RoleBindings

Replace the query with the following and click "Run Query":

```sql
fields @timestamp, @message
| sort @timestamp desc
| limit 100
| filter objectRef.resource="rolebindings" and verb in ["create", "update", "patch", "delete"]
```

### Find HTTP 5xx Server Errors Related to Kubernetes API Server Requests

In Kubernetes, 5xx errors refer to a category of HTTP status codes that are returned by the Kubernetes API server to indicate server-side errors. These errors occur when the API server encounters an issue or an unexpected condition that prevents it from fulfilling a client's request successfully.

- **500**: Internal Server Error
- **502**: Bad Gateway
- **503**: Service Unavailable
- **504**: Gateway Timeout
- **509**: Bandwidth Limit Exceeded

Replace the query with the following and click "Run Query":

```sql
fields @logStream, @timestamp, responseStatus.code, @message
| filter @logStream like /^kube-apiserver-audit/
| filter responseStatus.code >= 500
| limit 50
```

## Audit EKS using CloudTrail Insights

Use **CloudTrail Insights** to conduct an audit of your CloudTrail logs effectively. CloudTrail Insights automates the analysis of management events captured by your CloudTrail trails. It establishes a baseline for normal behavior and triggers Insights events when detecting unusual patterns. Upon detecting abnormal activity, CloudTrail Insights raises events via dashboard views in the CloudTrail console, delivers them to your Amazon S3 bucket, and forwards them to Amazon CloudWatch Events.

You can also enable Insights on a trail from the AWS CLI by using the `put-insight-selectors` command:

```shell
aws cloudtrail put-insight-selectors --trail-name eks-cloudtrail --insight-selectors '[{"InsightType": "ApiCallRateInsight"},{"InsightType": "ApiErrorRateInsight"}]'
```

AWS APIs called by pods that are using IAM Roles for Service Accounts (IRSA) are automatically logged to CloudTrail along with the name of the service account. If the name of a service account that wasn't explicitly authorized to call an API appears in the log, it may be an indication that the IAM role's trust policy was misconfigured. Generally speaking, CloudTrail is a great way to ascribe AWS API calls to specific IAM principals.

### Use CloudTrail Insights to unearth suspicious activity

CloudTrail Insights automatically analyzes write management events from CloudTrail trails and alerts you of unusual activity. This can help you identify when there's an increase in call volume on write APIs in your AWS account, including from pods that use IRSA to assume an IAM role. See [Announcing CloudTrail Insights: Identify and Respond to Unusual API Activity](https://aws.amazon.com/blogs/aws/announcing-cloudtrail-insights-identify-and-respond-to-unusual-api-activity/) for further information.

## Additional Resources

As the volume of logs increases, parsing and filtering them with Log Insights or another log analysis tool may become ineffective. As an alternative, you might want to consider running [**Sysdig Falco**](https://github.com/falcosecurity/falco) and [**ekscloudwatch**](ttps://github.com/sysdiglabs/ekscloudwatch). Falco analyzes audit logs and flags anomalies or abuse over an extended period of time.

The ekscloudwatch project forwards audit log events from CloudWatch to Falco for analysis. Falco provides a set of [default audit rules](https://github.com/falcosecurity/plugins/blob/master/plugins/k8saudit/rules/k8s_audit_rules.yaml) along with the ability to add your own.

Yet another option might be to store the audit logs in S3 and use the [**SageMaker Random Cut Forest**](https://docs.aws.amazon.com/sagemaker/latest/dg/randomcutforest.html) algorithm to detect anomalous behaviors that warrant further investigation.

## Tools and Resources

The following commercial and open-source projects can be used to assess your cluster's alignment with established best practices:

- [Amazon EKS Security Immersion Workshop - Detective Controls](https://aws.github.io/aws-eks-best-practices/security/docs/detective/)
- https://catalog.workshops.aws/eks-security-immersionday/en-US/5-detective-controls
- [kubeaudit](https://github.com/Shopify/kubeaudit)
- [kube-scan](https://github.com/octarinesec/kube-scan) - Assigns a risk score to the workloads running in your cluster in accordance with the Kubernetes Common Configuration Scoring System framework
- [kubesec.io](https://kubesec.io/)
- [polaris](https://github.com/FairwindsOps/polaris)
- [Starboard](https://github.com/aquasecurity/starboard)
- [Snyk](https://snyk.io/)
- [Kubescape](https://github.com/kubescape/kubescape) - An open-source Kubernetes security tool that scans clusters, YAML files, and Helm charts. It detects misconfigurations according to multiple frameworks (including [NSA-CISA](https://www.armosec.io/kubernetes-hardening/) and [MITRE ATT&CK®](https://www.microsoft.com/security/blog/2021/03/23/secure-containerized-environments-with-updated-threat-matrix-for-kubernetes/)).

## Conclusion

Using Amazon EKS control plane and CloudTrail logs is very important for improving your security posture.

By monitoring these logs, you gain invaluable insights into EKS activities and AWS API calls, enabling proactive detection and quick response to potential security threats. Implement these detective controls to enforce your AWS environment and maintain robust security standards.

## Resources

- https://docs.aws.amazon.com/guardduty/latest/ug/guardduty-eks-audit-log-monitoring.html
- https://aws.github.io/aws-eks-best-practices/security/docs/detective/
- https://www.eksworkshop.com/docs/observability/logging/cluster-logging/

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
