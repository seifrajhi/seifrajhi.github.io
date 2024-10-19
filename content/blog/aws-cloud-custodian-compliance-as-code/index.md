---
id: 43dbc91da7004256eefee495
path: "/blog/aws-cloud-custodian-compliance-as-code/"
date: "2024-10-19 20:34:00"
published: true
title: "AWS Cloud Custodian: The Open Source Tool for Compliance as Code and Auto-Remediation"
cover: "./custodian-cover.jpg"
excerpt: "Explore how Cloud Custodian enables compliance as code and auto-remediation to enhance your cloud security posture."
keywords:
  - AWS
  - Cloud Custodian
  - Compliance as Code
  - Auto-Remediation
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Automate Compliance Monitoring and Response with Cloud Custodian**

## 📑 Introduction

In today's cloud-first world, ensuring your cloud infrastructure complies with all relevant regulations is paramount. However, the manual management of compliance can prove to be both time-consuming and prone to errors.

This is where [Cloud Custodian](https://cloudcustodian.io/) — the open-source tool — can help. It's a rules-based engine poised to revolutionize your compliance management. With Cloud Custodian, automating compliance monitoring and remediation becomes a breeze. You can effortlessly craft policies that articulate your compliance needs and then watch as the enforcement of these policies unfolds automatically.

The outcome? Achieving nearly continuous compliance with significantly reduced effort and fewer resources.

## 🥅 Goals and Objectives

In this blog post, we'll dive deep into harnessing Cloud Custodian for compliance as code and auto-remediation, illuminating its potential through practical examples of enforcing specific compliance requirements.

**_Let's start 😄_**

## 💁‍♂ What is Cloud Custodian

[Cloud Custodian](https://cloudcustodian.io/) is an open-source, rules-based engine that can help you automate compliance monitoring and remediation in your cloud environment. It can be used to manage AWS, Azure, and GCP environments, and it supports a wide range of features, including:

- ✅ **Real-time compliance enforcement**
- ✅ **Tag management**
- ✅ **Cost optimization**
- ✅ **Resource cleanup**
- ✅ **Infrastructure as code (IaC) feedback**

## 💭 Features

- **Comprehensive support for public cloud services and resources**: Cloud Custodian supports a wide range of public cloud services and resources, including EC2, ASG, Redshift, CosmosDB, and PubSub Topic.
- **Run policies on infrastructure as code (Terraform, etc.) assets**: Cloud Custodian can also be used to run policies on infrastructure as code (IaC) assets, such as Terraform configurations. This allows you to ensure that your IaC is compliant with your organization's policies before it is deployed.
- **Supports arbitrary filtering on resources with nested boolean conditions**: Cloud Custodian allows you to filter resources using a variety of criteria, including tags, resource types, and resource attributes. You can also use nested boolean conditions to create complex filters.
- **Dry run any policy to see what it would do**: Cloud Custodian allows you to dry-run any policy before you deploy it. This allows you to see what the policy would do without actually making any changes to your environment.
- **Automatically provisions serverless functions and event sources**: Cloud Custodian can automatically provision serverless functions and event sources to enforce your policies. This eliminates the need to manually create and manage these resources.
- **Cloud provider native metrics outputs on resources that matched a policy**: Cloud Custodian can output metrics on resources that match a policy. This information can be used to track the effectiveness of your policies and to identify areas where you can improve your compliance.
- **Structured outputs into cloud native object storage of which resources matched a policy**: Cloud Custodian can also output structured data into cloud native object storage of which resources matched a policy. This information can be used to create reports and dashboards to track your compliance.
- **Intelligent cache usage to minimize API calls**: Cloud Custodian uses intelligent cache usage to minimize API calls. This helps to improve performance and reduce costs.
- **Supports multi-account/subscription/project usage**: Cloud Custodian can be used to manage resources in multiple accounts, subscriptions, and projects. This makes it ideal for organizations with complex cloud environments.
- **Battle-tested**: Cloud Custodian has been battle-tested in production on some very large cloud environments. This means that you can be confident that it can handle the demands of your organization.

## ⛴ Quick Install

Custodian is published on [PyPI](https://pypi.org/project/c7n/) as a series of packages with the `c7n` prefix. It's also available as a [Docker image](https://hub.docker.com/r/cloudcustodian/c7n).

```bash
$ python3 -m venv custodian
$ source custodian/bin/activate
(custodian) $ pip install c7n
```

## 🐳 Docker Installation

To install via Docker, run:

```bash
docker pull cloudcustodian/c7n
```

When executing, you'll need to export cloud provider credentials to the container. For instance, if you're using environment variables for provider credentials:

```bash
docker run -it \
    -v $(pwd)/output:/home/custodian/output \
    -v $(pwd)/policy.yml:/home/custodian/policy.yml \
    --env-file <(env | grep "^AWS\|^AZURE\|^GOOGLE") \
    cloudcustodian/c7n run -v -s /home/custodian/output /home/custodian/policy.yml
```


## ❎ Explore Cloud Custodian

- **Run `custodian -h`** to see a list of available commands.
- **Run `custodian schema`** to see the complete list of cloud resources against which you can run policies.
- To invoke command-line help with more information about policy schema details, run **`custodian schema -h`**.
- **Run `custodian schema <cloud-provider>`** to see the available resources for a specific cloud provider: `custodian schema aws`.
- **Run `custodian schema <cloud-provider>.<resource>`** to see the available filters and actions for each resource.

Drill down to get more information about available policy settings for each resource, where the model for the command is:

```bash
custodian schema <cloud>.<resource>.<category>.<item>
```

For instance:

```bash
custodian schema aws.s3.filters.is-log-target
```

provides the following information:

### Help

Filter and return buckets that are log destinations. Not suitable for use in lambda on large accounts, as this is an API-heavy process to detect and scan all possible log sources.

**Sources:**
- elb (Access Log)
- s3 (Access Log)
- cfn (Template writes)
- cloudtrail

**Example:**

```yaml
policies:
    - name: s3-log-bucket
        resource: s3
        filters:
            - type: is-log-target
```

### Schema

```json
{
    "additionalProperties": False,
    "properties": {
        "type": {
            "enum": ["is-log-target"]
        },
        "value": {
            "type": "boolean"
        }
    },
    "required": ["type"],
    "type": "object"
}
```

## 〽️ Usage

The first step to using Cloud Custodian (c7n) is writing a YAML file containing the policies that you want to run. Each policy specifies the resource type that the policy will run on, a set of filters which control which resources will be affected by this policy, actions which the policy will take on the matched resources, and a mode which controls how the policy will execute.

## ✍️ Write Your First Policy

A policy specifies the following items:
- The type of resource to run the policy against
- Filters to narrow down the set of resources
- Actions to take on the filtered set of resources

For this blog, let's stop all EC2 instances that are tagged with Custodian. To get started, go make an EC2 instance in your AWS console, and tag it with the key `Custodian` (any value). Also, make sure you have an access key handy.

Then, create a file named `custodian.yml` with this content:

```yaml
policies:
    - name: my-first-policy
        resource: aws.ec2
        filters:
            - "tag:Custodian": present
```

At this point, we have specified the following things:
- The name of the policy
- The resource type to query against, in this case `aws.ec2`
- The filters list
- The Custodian tag filter

Running this policy will not execute any actions as the actions list does not exist. We can extend this example to stop the instances that are actually filtered in by the Custodian tag filter by simply specifying the stop action:

```yaml
policies:
    - name: my-first-policy
        resource: aws.ec2
        filters:
            - "tag:Custodian": present
        actions:
            - stop
```

## ✍️ A 2nd Example Policy

First, a role must be created with the appropriate permissions for the custodian to act on the resources described in the policies YAML given as an example below. For convenience, an [example policy](https://cloudcustodian.io/docs/_static/custodian-quickstart-policy.json) is provided for this quick-start guide. Customized AWS IAM policies will be necessary for your own custodian policies.

To implement the policy:

1. **Open the AWS console**
2. **Navigate to IAM -> Policies**
3. **Use the JSON option to copy the example policy as a new AWS IAM Policy**
4. **Name the IAM policy as something recognizable and save it.**
5. **Navigate to IAM -> Roles and create a role called `CloudCustodian-QuickStart`**
6. **Assign the role the IAM policy created above.**

Now with the pre-requisite completed, you are ready to continue and run custodian.

A custodian policy file needs to be created in YAML format, as an example

```yaml
policies:
- name: s3-cross-account
  description: |
    Checks S3 for buckets with cross-account access and
    removes the cross-account access.
  resource: s3
  conditions:
    - region: us-east-1
  filters:
    - type: cross-account
  actions:
    - type: remove-statements
      statement_ids: matched
- name: ec2-require-non-public-and-encrypted-volumes
  resource: aws.ec2
  description: |
    Provision a lambda and cloud watch event target
    that looks at all new instances and terminates those with
    unencrypted volumes.
  mode:
    type: cloudtrail
    role: CloudCustodian-QuickStart
    events:
      - RunInstances
  filters:
    - type: ebs
      key: Encrypted
      value: false
  actions:
    - terminate
- name: tag-compliance
  resource: aws.ec2
  description: |
    Schedule a resource that does not meet tag compliance policies
    to be stopped in four days.
  filters:
    - State.Name: running
    - "tag:Environment": absent
    - "tag:AppId": absent
    - or:
      - "tag:OwnerContact": absent
      - "tag:DeptID": absent
  actions:
    - type: mark-for-op
      op: stop
      days: 4
```

Given that, you can run Cloud Custodian with

```shell
# Validate the configuration (note this happens by default on run)
custodian validate policy.yml
# Dryrun on the policies (no actions executed) to see what resources
# match each policy.
custodian run --dryrun -s out policy.yml
# Run the policy
custodian run -s out policy.yml
```

## 🌴 manheim-c7n-tools

Cloud Custodian (a.k.a. c7n) is a flexible rules engine for reporting on and enforcing policy in AWS. Manheim has migrated from Netflix Janitor Monkey to Cloud Custodian for our tag enforcement, resource cleanup, cost reduction, and other policy needs. This project provides common tooling to allow us to deploy and manage c7n across multiple AWS accounts.

Manheim's Cloud Custodian (c7n) wrapper package, policy generator, runner, and supporting tools.
This project provides common tooling, distributed as a Docker image, for managing Manheim's cloud-custodian (c7n) tooling, including c7n itself, c7n_mailer, and our custom components. This project/repository is intended to be used (generally via the generated Docker image) alongside a configuration repository of a specific layout, containing configuration for one or more AWS accounts.

Full Documentation: https://manheim-c7n-tools.readthedocs.io/
GitHub Actions Builds: https://github.com/manheim/manheim-c7n-tools/actions
Docker image: https://hub.docker.com/r/manheim/manheim-c7n-tools

**Policy Language:**

The `policies/` directory in the configuration repository contains the c7n policies, one per file. Policies must have a name that matches their filename (NAME.yml) and should all have a comment or comments section that provides a human-readable summary of what the policy does (this comment is used to generate the Current Policies documentation).

All policies are built on top of defaults.yml; [see Defaults mergin](https://manheim-c7n-tools.readthedocs.io/en/latest/policygen/#policygen-defaults-merging)g for further information.

Policies are built via the [policygen](https://manheim-c7n-tools.readthedocs.io/en/latest/policygen/#policygen) command (or the manheim-c7n-tools policygen step), which runs Policygen and generates per-region `custodian_REGION.yml` files.

**Policy Repository Layout:**

The overall layout of the configuration repository must be as follows:

```shell
mailer-templates/  (optional)
accounts-config.yml
policies/
├── all_accounts
│   └── common
│       └── policy-one.yml
├── defaults.yml
└── ACCOUNT-NAME
    ├── common
    │   ├── policy-three.yml
    │   └── policy-two.yml
    ├── eu-west-1
    │   ├── policy-five-eu-west-1.yml
    │   └── policy-four-eu-west-1.yml
    ├── eu-west-2
    │   └── policy-four-eu-west-2.yml
    ├── eu-west-3
       └── policy-four-eu-west-3.yml
```

The `policies/` directory contains:

- `defaults.yml`: The defaults used for **ALL** policies in all accounts (see [Defaults merging](https://manheim-c7n-tools.readthedocs.io/en/latest/policygen/#policygen-defaults-merging) for further information).
- An `all_accounts/` directory of policies shared identically across all accounts.
- A directory of account-specific policies for each account; the directory name must match the `account_name` value in `accounts-config.yml`.

Within each subdirectory (`all_accounts` or an account name) is a directory called `common` and optionally directories for one or more specific regions. Policies in the `common/` directory will be applied in all regions and policies in a region-specific directory will only be applied in that region.

When building the final configuration, policies from the account-specific directory will be layered on top of policies from the `all_accounts/` directory. A policy with the exact same file and policy name in a per-account directory will override a policy with the same name from the `all_accounts/` directory. Similarly, within the `all_accounts/` or account-named directories, a region-specific policy will override a `common/` policy with the same name and filename.

### 🛠️🔐 Hands-on Example

[In this repository](https://github.com/seifrajhi/cloud-custodian-automation), you'll find a comprehensive set of [Terraform](https://www.terraform.io/) code designed to seamlessly implement Cloud Custodian, along with all the essential resources required for streamlined compliance management in your cloud environment. From IAM roles and policies to S3 buckets and CloudWatch SQS.

**Things to Note:**

- One policy per file is allowed, and the title of the policy should match the name of the policy file.
- The policies inside the `all_accounts/common` directory are applied in all the accounts.
- If the same policy is defined in the `all_accounts` directory and also in a specific account, the policy in the specific account takes precedence for that account.
- By default, if no mode or action is mentioned in the policy, it defaults to periodic mode with execution every Monday at 14:00 UTC, and the action would be to notify on Slack (#custodian) with the default template.
- Custom templates can be configured inside the `mailer-templates` to be used with the notify type action, to create custom reports.
- A policy can be disabled by simply setting the `disable` key inside the policy to `true`.
- In order to test new policies, a policy can run in notify-only mode that sends notifications but does not take action.

### 📝 Wrap Up

Cloud Custodian, the open-source powerhouse, is the key to ensuring compliance in today's dynamic cloud management landscape. This blog post has revealed its transformative potential, from crafting policies in YAML to its versatility across AWS, Azure, and GCP.

By embracing Compliance as Code and auto-remediation, Cloud Custodian takes your cloud governance and compliance to new heights. It's not just a tool, but a powerful ally in your mission for secure, cost-effective, and regulation-compliant cloud infrastructure.

DevOps processes can incorporate automated security testing and compliance, bringing us much closer to DevSecOps. Cloud Custodian solves the challenges of security enforcement, tagging, unused or invalid resources cleanup, account maintenance, cost control, and backups.

Let your imagination run wild and use these tools to get more visibility and control over your entire AWS environment.

<br>
<br>

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** https://www.linkedin.com/in/rajhi-saif/

**♻️ X/Twitter:** https://x.com/rajhisaifeddine

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
