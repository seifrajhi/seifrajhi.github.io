import React from "react"

import Layout from "../../components/theme/layout"
import Seo from "../../components/seo/seo"
import MainNavigation from "../../components/main-navigation"
import CvHeader from "../../components/cv/cv-header"
import ThemeSwitcher from "../../components/theme/theme-switcher"
import SocialLinks from "../../components/homepage/SocialLinks"
import BreadcrumbsSnippet from "../../components/seo/breadcrumbs-snippet"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { Link } from "gatsby"

import "./cv.css"

const PlatformEngineerCV = () => {
  return (
    <Layout>
      <Seo
        isUniqueTitle={true}
        title={"Saifeddine Rajhi's Platform Engineer CV"}
        className="cv-view-page"
        pagePath="/cv/platform-engineer"
        ogType="website"
        description="Saifeddine Rajhi's Platform Engineer CV"
        keywords={[
          "Platform Engineer",
          "magento Platform engineer",
          "cv",
          "Platform engineer cv",
          "Platform engineer resume",
        ]}
      />
      <main
        itemScope
        itemType="http://schema.org/Person"
        className="cv cv-platform-engineer"
      >
        <div
          className="pdf-badge"
          onClick={() => {
            trackCustomEvent({
              category: "cv",
              action: "download",
              label: "platform-engineering",
            })

            typeof window !== "undefined" &&
              typeof window.gtag !== "undefined" &&
              window.gtag("event", "download", {
                event_category: "cv",
                event_label: "platform-engineering",
              })

            window.print()
          }}
          title="Download CV as a PDF file"
        >
          <a>pdf</a>
        </div>
        <header>
          <div className="theme-switcher">
            <ThemeSwitcher />
          </div>
          <MainNavigation space={"cv"} />
          <CvHeader position={`Senior Platform/SRE Engineer`} />
          <SocialLinks showPatreon={false} />
        </header>
        <div className="cv-content">
          <div className="cv-content-column additional-column">
            <section itemScope itemType="http://schema.org/ItemList">
              <dl className="notop-margin">
                <dt>
                  <h2 className="notop-margin">
                    <span itemProp="name">Profile</span>
                  </h2>
                </dt>
                <ul>
                  <li itemProp="itemListElement">
                    Aspiring <strong>problem solver</strong> & Platform engineer
                  </li>
                  <li itemProp="itemListElement">
                    <strong>6+ years</strong> of experience in{" "}
                    <strong>DevOps</strong> and Cloud
                    engineering
                  </li>
                  <li itemProp="itemListElement">
                    <strong>3+ years</strong> of experience in{" "}
                    <strong>SRE and cloud native technologies</strong>
                  </li>
                  <li itemProp="itemListElement">
                    Expertise in a broad variety of technical and business
                    topics
                  </li>
                  <li itemProp="itemListElement">
                    Constant, quick & curious learner
                  </li>
                  <li itemProp="itemListElement">Positive attitudes</li>
                </ul>
              </dl>
            </section>
            <section itemType="http://schema.org/ItemList">
              <dl>
                <dt>
                  <h2>
                    <span itemProp="name">Skills</span>
                  </h2>
                </dt>
                <ul>
                  <li itemProp="itemListElement">
                    Experience: Infrastructure as code, container technologies, 
                    automation, GitOps, AWS cloud, CI/CD pipelines
                    platform & site reliability engineering
                  </li>
                  <li itemProp="itemListElement">
                    Languages: <strong>Python</strong>, Golang, Shell
                  </li>
                  <li itemProp="itemListElement">
                    IAC tools: Terraform, cloudformation, crossplane
                  </li>
                  <li itemProp="itemListElement">
                    containerization: Docker, Kubernetes, cri-o.
                  </li>
                </ul>
              </dl>
            </section>
            <section>
              <h2>
                <span>Education</span>
              </h2>
              <ul>
                <li
                  itemScope
                  itemType="http://schema.org/EducationalOrganization"
                >
                  <strong>Network and distributed systems engineer</strong>, 2015-2018
                </li>
                <li
                  itemScope
                  itemType="http://schema.org/EducationalOrganization"
                >
                  <strong>M.S. Computer Engineering</strong>
                  <br />{" "}
                  <span itemProp="name">Khmelnytskyi National University</span>,
                  Ukraine, 2018
                </li>
              </ul>
            </section>
          </div>
          <div className="cv-content-column main-column">
            <section className="jobs">
              <h2>
                <span>Work Experience</span>
              </h2>
              <ul>
                <li
                  itemScope
                  itemType="http://schema.org/Organization"
                  className="job"
                >
                  <strong itemProp="jobTitle">
                    Senior Platform Engineer 
                  </strong>
                  , <span itemProp="name">Justeat Takeaway.com</span>; The Netherlands — April 2023 -
                  June 2024
                  <br />
                  <div className="job-description">
                    Have been working on infrastructure optimization and application deployment in EKS (Elastic Kubernetes Service), ensuring high availability and performance:
                    <ul>
                      <li>
                        Monitored the maintenance and optimization of the site's infrastructure to ensure high availability and performance
                      </li>
                      <li>
                        Implemented and provisioned infrastructure in EKS to support the deployment of applications
                      </li>
                      <li>
                        Enforced standardized deployment practices, following a golden path approach for consistency and efficiency
                      </li>
                      <li>
                        Conducted system upgrades and ensured seamless integration of new features to enhance platform reliability
                      </li>
                      <li>
                        Actively participated in on-call rotations, responding promptly to incidents and ensuring system stability
                      </li>
                      <li>
                        Collaborated with cross-functional teams to address technical challenges and enhance overall system efficiency
                      </li>
                      <li>
                        Ensured our clients' workloads are optimized for cost, security, performance, reliability, and sustainability
                      </li>
                      <li>
                        Installed and configured the integration and production environment on AWS
                      </li>
                    </ul>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: AWS, GIT, Python, Terragrunt, Atlantis, Docker, Helm, Kubernetes, Terraform, DataDog
                    </li>
                  </ul>
                </li>                
                <li
                  itemScope
                  itemType="http://schema.org/Organization"
                  className="job"
                >
                  <strong itemProp="jobTitle">
                    Senior Site Reliability Engineer 
                  </strong>
                  , <span itemProp="name">Storm Reply</span>; Paris, France — August 2022 – March 2023
                  <br />
                  <div className="job-description">
                    Have been working on migrating and optimizing clients' workloads to AWS and managing CI/CD pipelines:
                    <ul>
                      <li>
                        Migrated our clients’ workloads to the AWS cloud as an AWS partner
                      </li>
                      <li>
                        Assisted clients with the process of portfolio analysis to estimate migration costs and create a TCO analysis
                      </li>
                      <li>
                        Managed the CI/CD pipelines using Jenkins and other tools
                      </li>
                      <li>
                        Managed automation pipelines using Terraform, Jenkins, and CloudFormation
                      </li>
                      <li>
                        Managed AWS accounts via Control Tower and Organizations
                      </li>
                      <li>
                        Ensured our clients' workloads are optimized for cost, security, performance, reliability, and sustainability
                      </li>
                      <li>
                        Installed and configured the integration and production environment on AWS
                      </li>
                    </ul>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Linux, AWS, GitOps, Python, Jenkins, Inspec, Docker, Oracle, Cassandra, Kubernetes, Terraform
                    </li>
                  </ul>
                </li>

                <li
                  itemScope
                  itemType="http://schema.org/Organization"
                  className="job"
                >
                  <strong itemProp="jobTitle">
                    DevOps Engineer
                  </strong>
                  , <span itemProp="name">Michelin</span>; Paris, France — June 2020 – August 2022
                  <br />
                  <div className="job-description">
                    Have been working on managing CI/CD pipelines and automating infrastructure on AWS:
                    <ul>
                      <li>
                        Managed the CI/CD pipelines using Jenkins and other tools
                      </li>
                      <li>
                        Installed and configured the acceptance environment
                      </li>
                      <li>
                        Processed Prod / Pre-Prod incidents and monitored daily processing
                      </li>
                      <li>
                        Automated the infrastructure using Terraform and CloudFormation
                      </li>
                      <li>
                        Monitored, surveilled, and centralized logs via the ELK stack
                      </li>
                      <li>
                        Administered the system, ensuring smooth operations
                      </li>
                      <li>
                        Installed the production environment on AWS cloud using Terraform and CloudFormation
                      </li>
                      <li>
                        Configured platforms and servers via Ansible and Chef
                      </li>
                      <li>
                        Conducted real-time monitoring using Kibana and Grafana
                      </li>
                    </ul>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Linux, Grafana, GIT, Python, Jenkins, AWS, Docker, Oracle, Maven, Sonarqube, Terraform
                    </li>
                  </ul>
                </li>

                <li
                  itemScope
                  itemType="http://schema.org/Organization"
                  className="job"
                >
                  <strong itemProp="jobTitle">
                    eCommerce Magento Software Developer
                  </strong>
                  , <span itemProp="name">Atwix</span>; Ukraine — 2015-2017 (2
                  years)
                  <br />
                  <div className="job-description">
                    <Link
                      target="_blank"
                      rel="noopener"
                      to="/cv/ecommerce-developer/"
                      title="Go to Technical blog"
                    >
                      See what I have done there in great details
                    </Link>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Linux, Git, PHP, MySQL,
                      Elasticsearch, Redis
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
            <section
              itemScope
              itemType="http://schema.org/ItemList"
              className="leadership"
            >
              <dl>
                <dt>
                  <h2>
                    <span itemProp="name">Communication & Leadership</span>
                  </h2>
                </dt>
                <ul>
                  <li itemProp="itemListElement">
                    <strong>Technical Leadership</strong> of Software
                    Engineering Team (3.5 years) <br />
                    Led cross-functional teams of different sizes (5-15 people
                    incl. SEs, QA, PM, DevOps). Organized and optimized team
                    processes. <br /> Took part in presentations and frequent
                    calls with clients, project groomings, and delivered
                    internal technical workshops. Advocated software engineer's
                    needs behind C-level management.
                  </li>
                  <li itemProp="itemListElement">
                    Organized technical and business{" "}
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://www.atwix.com/magento/atwix-magenews-jun-2020/"
                    >
                      newsletter
                    </a>{" "}
                    (led for 2 years) <br />
                  </li>
                  <li itemProp="itemListElement">
                    Write{" "}
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://seifrajhi.github.io/blog/"
                    >
                      technical blog posts
                    </a>{" "}
                    and{" "}
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://seifrajhi.github.io/thoughts/"
                    >
                      thoughts about management
                    </a>
                  </li>
                </ul>
              </dl>
            </section>
            <section itemScope itemType="http://schema.org/ItemList">
              <dl>
                <dt>
                  <h2>
                    <span itemProp="name">Hobby & Interests</span>
                  </h2>
                </dt>
                <ul>
                  <li itemProp="itemListElement">Scooter driving</li>
                  <li itemProp="itemListElement">Self-improvement</li>
                  <li itemProp="itemListElement">Reading</li>
                  <li itemProp="itemListElement">
                    <a
                      rel="me"
                      target="_blank"
                      rel="noopener"
                      href="https://seifrajhi.github.io/"
                    >
                      Blogging
                    </a>
                  </li>
                  <li itemProp="itemListElement">
                    <a target="_blank" href="https://github.com/seifrajhi">
                      Open Source
                    </a>
                  </li>
                  <li itemProp="itemListElement">AWS Community Builder</li>
                </ul>
              </dl>
            </section>
          </div>
        </div>
      </main>
      <BreadcrumbsSnippet
        crumbs={[{ "/cv/platform-engineer/": "Platform/SRE Engineer CV" }]}
      />
    </Layout>
  )
}

export default PlatformEngineerCV
