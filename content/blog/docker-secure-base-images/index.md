---
id: bb0013e6ac5ebd3e2579f4e0
path: "/blog/docker-secure-base-images/"
date: "2024-10-27 15:06:00"
published: true
title: "Protecting Your Containerized Docker Applications from the Inside Out: Secure Base Images"
cover: "./secure-docker-cover.png"
excerpt: "How to protect your Docker applications with secure base images, ensuring consistency and reliability in your cloud environment."
keywords:
  - Docker
  - Secure best practices
  - Container Security
  - Cloud Reliability
  - DevSecOps
coverCredits: 'Photo by Saifeddine Rajhi'
---

> **Out-of-the-Box Secure Base Images**

## 🐳 Introduction

Containerized applications are rapidly becoming the standard for deploying and managing software. However, with this popularity comes increased risk. Containerized applications are often built on top of base images, which are pre-built images that contain the operating system and other dependencies needed to run the application. If the base image is insecure, it can leave your entire application vulnerable to attack. That's why it's important to use secure base images when building containerized applications.

Secure base images are base images that have been designed and maintained with security in mind. They typically contain a minimal set of packages and are configured to reduce the attack surface.

In this blog post, we will discuss what secure base images are, the benefits of using them, how to use them, and some additional tips for using them. We will also discuss out-of-the-box secure base images, which make it easy to get started with using secure base images.

### 🔏 The Importance of a Good Base Image

A strong base image is essential for containerized applications. It forms the core of your container and should be minimal, meaning it includes only the necessary components and dependencies. This minimization reduces the potential attack surface, making your applications more secure and efficient.

Here are some examples of minimal base images that are commonly used in containerization:

1. **Scratch**:
    [Scratch](https://docs.docker.com/build/building/base-images/#create-a-simple-parent-image-using-scratch) is as minimal as it gets — it's an empty base image. This means there are no pre-installed packages, libraries, or shells. While it might seem extreme, this approach is useful for certain scenarios, especially with Go applications that typically bundle all their dependencies. However, it can be challenging to add additional software to a Scratch-based image.

    When you use Scratch as a base image, you start with a completely clean slate, and you must add all the necessary files and dependencies for your application to run.

    Here are some key points to understand about Scratch:

    - **Zero Overhead**: Scratch has virtually no overhead because it doesn't include any operating system components or unnecessary files. This makes it incredibly lightweight and efficient, which is ideal for certain use cases, especially in microservices architecture.
    - **Total Control**: Using Scratch gives you complete control over what goes into your container image. You can add only the essential files and libraries needed for your application, resulting in a minimal and highly optimized image.
    - **Security Benefits**: Since Scratch has no extraneous software or utilities, it inherently reduces the attack surface of your container. This minimalism can enhance security by minimizing the potential vulnerabilities present in your image.
    - **Challenges**: While Scratch offers many benefits, it also presents challenges. Since it's essentially an empty container, you need to handle all aspects of your application's runtime environment. This means you must manually add libraries, dependencies, and configuration files, which can be more complex and time-consuming than starting from a base image that includes these components.

    Here's a simple example of creating a Dockerfile that uses Scratch as a base image for a minimal Go application:

    ```dockerfile
    # Use the official Golang base image to build your Go application
    FROM golang:1.17 AS builder

    # Set the working directory inside the container
    WORKDIR /app

    # Copy the source code into the container
    COPY . .

    # Build the Go application
    RUN go build -o myapp

    # Create a new image using Scratch as the base
    FROM scratch

    # Copy the compiled binary from the previous stage
    COPY --from=builder /app/myapp /myapp

    # Specify the command to run when the container starts
    CMD ["/myapp"]
    ```

    In this example, we first use the official Golang base image to build our Go application. Once the application is compiled, we create a new image using Scratch as the base. We then copy only the compiled binary into the Scratch-based image and specify the command to run the application.

    This Dockerfile creates an incredibly minimal container image that contains only your Go application, resulting in a minimal attack surface and efficient use of resources. However, remember that using Scratch requires careful consideration of all dependencies and runtime requirements for your application.

2. **Distroless**:
   
    [Distroless](https://github.com/GoogleContainerTools/distroless) is a security-focused base image created by Google. It includes essential components like libc, passwd, groups, and a list of trusted certificate authorities but omits any shell. This minimalism enhances security by reducing potential entry points for attackers.

    Here's an example of creating a Dockerfile that uses Distroless as a base image for a minimal Go application:

    ```dockerfile
    # Use the official Golang base image to build your Go application
    FROM golang:1.17 AS builder

    # Set the working directory inside the container
    WORKDIR /app

    # Copy the source code into the container
    COPY . .

    # Build the Go application
    RUN go build -o myapp

    # Create a new image using Distroless as the base
    # Distroless images are available for various programming languages
    # In this case, we're using the golang Distroless image
    FROM gcr.io/distroless/base-debian11

    # Copy the compiled binary from the previous stage
    COPY --from=builder /app/myapp /myapp

    # Specify the command to run when the container starts
    CMD ["/myapp"]
    ```

    In this example, we follow a similar pattern as before. We first use the official Golang base image to build our Go application. Once the application is compiled, we create a new image using Distroless as the base. We then copy only the compiled binary into the Distroless-based image and specify the command to run the application.

    Using Distroless as a base image strikes a balance between minimalism and convenience. It provides the necessary runtime components while eliminating unnecessary packages and tools that could pose security risks. Distroless images are available for various programming languages, making it a versatile choice for containerizing applications across different stacks.

###  Red Hat UBI (Universal Base Image)

[Red Hat Universal Base Images (UBIs)](https://hub.docker.com/r/redhat/ubi8) are container base images provided by Red Hat. UBIs come in different variants, including minimal ones, which are suitable for secure containerization. Here's an example of creating a Dockerfile that uses Red Hat UBI as a base image for a minimal Go application:

```dockerfile
# Use the official Golang base image to build your Go application
FROM golang:1.17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Build the Go application
RUN go build -o myapp

# Create a new image using Red Hat UBI as the base
# You can choose the minimal variant of Red Hat UBI for enhanced security
FROM registry.access.redhat.com/ubi8/ubi-minimal

# Copy the compiled binary from the previous stage
COPY --from=builder /app/myapp /myapp

# Specify the command to run when the container starts
CMD ["/myapp"]
```

In this example, we begin by using the official Golang base image to build our Go application. Once the application is compiled, we create a new image using Red Hat UBI as the base. You can choose the "ubi-minimal" variant to reduce the attack surface and enhance security. We then copy only the compiled binary into the UBI-based image and specify the command to run the application.

Red Hat UBI provides a secure and certified base image for containerization, which can be especially valuable in enterprise environments where security and compliance are critical considerations. The "ubi-minimal" variant is designed to minimize the image's footprint while ensuring it contains the necessary components for running applications.

### 🐺 Introducing Wolfi: The Undistro for Container Environments

[Chainguard](https://www.chainguard.dev/) has revealed [Wolfi](https://www.chainguard.dev/unchained/introducing-wolfi-the-first-linux-un-distro), a Linux distribution designed exclusively for container environments, built with a strong emphasis on securing the software supply chain. Wolfi is not your typical Linux distribution; it's what Chainguard refers to as an "undistro" because it's not intended for bare-metal use but is instead tailored for the cloud-native era.

#### Key Features of Wolfi

Wolfi stands out with its unique features:

- **Build-Time SBOM**: Wolfi provides a high-quality, build-time Software Bill of Materials (SBOM) for all included packages. This transparency ensures that you are aware of the components used in your container images, enhancing security and compliance.
- **Granular and Independent Packages**: Each package included in Wolfi is designed to be granular and independent, allowing you to create minimal and efficient container images.
- **apk Package Format**: Similar to Alpine Linux, Wolfi uses the proven and reliable apk package format. This choice ensures compatibility and ease of use for developers.
- **Declarative and Reproducible Build System**: Wolfi offers a fully declarative and reproducible build system, promoting consistency and reliability in your containerized applications.
- **Support for glibc and musl**: Wolfi is designed to support both glibc and musl, catering to a wide range of application requirements.

#### Why Wolfi Is Different

One of the most significant differences between Wolfi and traditional Linux distributions is its lack of a Linux kernel. Instead, Wolfi relies on the underlying environment, such as the container runtime, to provide the kernel. This decision aligns with Wolfi's focus on minimalism and its role as an undistro for cloud-native environments.

Here's an example of creating a Dockerfile that uses Wolfi as a base image for a minimal Go application:

```dockerfile
# Use the official Golang base image to build your Go application
FROM golang:1.17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Build the Go application
RUN go build -o myapp

# Create a new image using Wolfi as the base
FROM wolfi:latest

# Copy the compiled binary from the previous stage
COPY --from=builder /app/myapp /myapp

# Specify the command to run when the container starts
CMD ["/myapp"]
```

In this example, we start by using the official Golang base image to build our Go application. After compiling the application, we create a new image using Wolfi as the base. Please note that you would typically specify the actual Wolfi image name and tag (e.g., "wolfi:latest") based on the Wolfi distribution you have.

Like other minimal base images, Wolfi allows you to create secure and efficient container images. You can customize the image to include only the necessary components for your application, resulting in a smaller attack surface and optimized resource usage. Wolfi's emphasis on providing a build-time Software Bill of Materials (SBOM) ensures transparency and traceability in your containerized applications.

For more information and to get started with Wolfi, [visit Chainguard's official website](https://www.chainguard.io/wolfi).

### 📌 Closing Thoughts

A good base image is the cornerstone of secure and efficient containerization. Wolfi, the innovative Linux distribution from Chainguard, offers a unique approach to creating minimal and secure container images.

With its build-time SBOM, granular packages, and focus on cloud-native environments, Wolfi is a promising choice for those looking to enhance their container security and software supply chain transparency.


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
