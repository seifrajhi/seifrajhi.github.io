---
id: 5164d2634eefaf59da8496ec
path: "/blog/sysdig-docker-scout-cloud-native-security/"
date: "2024-10-24 21:36:00"
published: true
title: "Sysdig and Docker Forge Alliance to Accelerate Cloud-Native Security: Docker Scout🐳"
cover: "./scout-cover.jpg"
excerpt: "Learn how Sysdig and Docker's new alliance, featuring Docker Scout, aims to enhance cloud-native security with prioritized risk management and improved security posture."
keywords:
  - Docker
  - Sysdig
  - Cloud-Native Security
  - Docker Scout
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Shift Left and Shield Right with Prioritized Risk and Improved Security Posture**

## 🐋 Introduction

[Docker](https://www.docker.com/) and [Sysdig](https://sysdig.com/), two leading providers of cloud-native solutions, have announced a new partnership to accelerate and secure cloud-native application delivery. The partnership integrates Sysdig runtime insights into Docker Scout, providing developers with actionable insights to prioritize risk and improve their security posture.

This integration is a significant development for the cloud-native community, as it brings together two of the most widely used tools for container security and application delivery. Sysdig is known for its ability to provide deep visibility into containerized environments, while Docker Scout is a newly launched tool that helps developers to identify and fix security vulnerabilities in their container images.

By combining the strengths of these two tools, Sysdig and Docker are making it easier for developers to secure their cloud-native applications throughout the entire software development lifecycle. This is especially important in today's fast-paced and ever-changing threat landscape.

## 🥅 Goals and Objectives

In this blog post, we will discuss the new partnership between Sysdig and Docker, and how it will help developers to accelerate and secure cloud-native application delivery.

![scout](./docker.png)

## ☸️ Sysdig Runtime Insights and Docker Scout

Sysdig and Docker have jointly announced an integration at [DockerCon](https://www.dockercon.com/), [merging Sysdig runtime insights with Docker Scout](https://www.docker.com/press-release/announces-new-local-cloud-products-to-accelerate-delivery-of-secure-apps/). This collaboration aims to aid developers in prioritizing risk assessment within their CLI and simplify vulnerability identification in container-based applications. Docker Scout, an event-based tool, enhances the development process by providing integrations with Sysdig, JFrog Artifactory, AWS ECR, BastionZero, GitHub, GitLab, CircleCI, and Jenkins, optimizing DevSecOps workflows.

Eric Carter, a senior product marketing manager at Sysdig, underscores the significance of Docker Scout as a conduit for Sysdig's container image insights through its cloud-native application protection platform (CNAPP).

During DockerCon, Docker, Inc. made [Docker Scout](https://docs.docker.com/scout/) generally available, marking a pivotal moment in streamlining the developer's inner-loop process for creating container-based applications. The goal is to improve developer productivity, reduce post-deployment vulnerabilities, and expedite image creation, potentially saving developers up to an hour per day per project.

Furthermore, Docker, Inc. introduced Docker Debug and an enhanced Docker Build tool, which offers substantially improved speed and allows for cloud service offloading.

## 🛠️ What is Docker Scout

Docker Scout is designed to generate actionable insights for the software supply chain. It offers a layer-by-layer view of image dependencies, vulnerabilities, comparisons, and remediation paths. Docker announced the general availability of Docker Scout this week at DockerCon. You can check out their announcement [here](https://www.docker.com/blog/introducing-docker-scout/).

## 🔍 What are Sysdig Runtime Insights

Sysdig's deep runtime security visibility uses system calls at the kernel level to identify container activity. This is critical for [threat detection](https://sysdig.com/solutions/cloud-threat-detection-and-response/) but also enables Sysdig Secure to identify running containers and the packages loaded at runtime. Often, containers include packages to accommodate potential dependencies that are never used. [Runtime insights](https://sysdig.com/why-runtime-insights/) help you clearly see what's in use and what's not.

![insights](./insights.png)

## 🔒 Enhanced Security with Docker Scout and Sysdig

Docker Scout and Sysdig together provide a robust solution for managing container security. By leveraging the strengths of both tools, developers can gain deeper insights into their container images and prioritize remediation efforts effectively.

### 🧩 Prioritize Risks Using SBOMs and Runtime Insights

Container images are often built from layers of other container images and software packages. These layers and packages can contain vulnerabilities that make your containers and the applications they run vulnerable to attack. Docker Scout can proactively help you find and fix these vulnerabilities, helping you create a more secure software supply chain. It does this by analyzing your images and creating a full inventory of the packages and layers called a [Software Bill of Materials (SBOM)](https://ntia.gov/sites/default/files/publications/sbom_at_a_glance_apr2021_0.pdf). It then correlates this inventory with a continuously updated vulnerability database to identify vulnerabilities in your images.

### 📜 What is SBOM?

A Software Bill of Materials (SBOM) is key when shifting security left. SBOMs provide an artifact that contains a comprehensive list of software assets and dependencies that make up a piece of software. SBOMs are also handy for knowing details such as the licensing covering each package. In terms of security, an SBOM is key for staying on top of security risks. It helps maintain an accurate and updated correlation between package dependencies, which makes the detection task easier.

### 🛡️ Docker Scout and Sysdig to Manage Container Security

Docker Scout is a tool that helps Docker users manage container security. It provides a unified software analysis view to help users understand their image composition, correlates security risks with the image's SBOM, and gives contextual remediation advice. Sysdig is a container security platform that provides runtime insights into containerized applications. It can be integrated with Docker Scout to provide additional information about CVE data and in-use vulnerabilities.

#### Use Case 1: CVE Data and In-Use Vulnerabilities

Docker Scout can get CVE information from the SBOM, but it does not know which packages are actually in use. The Sysdig integration allows developers to see which CVE data impacts in-use packages, so they can prioritize remediation efforts.

![cve](./cve.png)

Vulnerabilities are ordered and summarized by priority, from the highest (CRITICAL) to the lowest (LOW). With the Sysdig integration, developers also get information about whether a vulnerability impacts in-use packages or not.

![vulnerabilities](./vulnerabilities.png)

#### Use Case 2: Compare Vulnerabilities Between Releases

At software development time, it is important to have visibility into the differences between the code being developed and the code that is deployed in production. Docker Scout can be used to compare a local image to an image that is currently running in a cluster, and to identify any vulnerabilities that exist in the newer image but not in the older image. This information can then be used to prioritize remediation efforts and to minimize security blind spots in production. In addition to identifying new vulnerabilities, the "compare" approach can also be used to identify packages that are no longer in use. These packages can then be removed from the image, which can help to reduce the attack surface and make the image more lean and efficient.

![compare](./compare.png)

#### Use Case 3: View Image Insights in Your CI/CD Pipeline

Docker Scout can be integrated into the CI/CD pipeline workflow to get vulnerability and runtime insights when building and pushing images. This can be done using a variety of CI/CD tools, including GitHub, GitLab, CircleCI, Microsoft Azure DevOps Pipelines, and Jenkins. Specifically for GitHub, Docker Scout can be integrated using the popular Docker Build and Push GitHub Action. This action allows developers to build and push images to Docker Hub from their GitHub workflows.

### 🛠️ View and Manage Security Issues

Docker Scout results can be viewed and managed across various interfaces, including Docker Desktop, the Docker CLI, Docker Hub, and the Docker Scout Dashboard. The Docker Scout Dashboard provides a unified view of discovered vulnerabilities, as well as extended information about CVEs and recommendations on how to remediate them by updating to a different base image. The Docker Scout Dashboard web console gives developers a view into discovered vulnerabilities but also provides extended information about CVEs along with recommendations on how to bypass vulnerabilities by updating to a different base image.

![issues](./issues.png)

### 🚀 Ship More Secure Images

The ability to compare images during the build phase with those running in production gives developers a new lens to help build better images. Beyond remediating in-use vulnerabilities, teams can see which packages are unused and consider if they can be removed to address "container bloat." Leaner container images have a reduced attack surface with the added benefit of being able to scale more quickly.

## 🏁 Conclusion

It is essential to identify, prioritize, and fix security issues across the software supply chain in order to avoid security breaches when software is released into production. Docker and Sysdig help teams to do this more effectively by providing real-time security information throughout the development and deployment process. The integration of Sysdig Secure and Docker Scout offers users new and powerful ways to stay on top of known CVEs and ensure the security of their software supply chain.

<br>

**_Until next time, つづく 🎉_**

> 💡 Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘  **_Until next time 🎉_**

🚀 Thank you for sticking up till the end. If you have any questions/feedback regarding this blog feel free to connect with me:

**♻️ LinkedIn:** [https://www.linkedin.com/in/rajhi-saif/](https://www.linkedin.com/in/rajhi-saif/)

**♻️ X/Twitter:** [https://x.com/rajhisaifeddine](https://x.com/rajhisaifeddine)

**The end ✌🏻**

<h1 align="center">🔰 Keep Learning !! Keep Sharing !! 🔰</h1>

**📅 Stay updated**

Subscribe to our newsletter for more insights on AWS cloud computing and containers.
