import React from "react"
import Layout from "../../components/theme/layout"
import Seo from "../../components/seo/seo"
import MainNavigation from "../../components/main-navigation"
import CvHeader from "../../components/cv/cv-header"
import ThemeSwitcher from "../../components/theme/theme-switcher"
import SocialLinks from "../../components/homepage/SocialLinks"
import BreadcrumbsSnippet from "../../components/seo/breadcrumbs-snippet"
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
            // Remove the old trackCustomEvent function
            // trackCustomEvent({
            //   category: "cv",
            //   action: "download",
            //   label: "platform-engineering",
            // })

            // Use window.gtag for custom events
            if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
              window.gtag("event", "download", {
                event_category: "cv",
                event_label: "platform-engineering",
              });
            }

            window.print();
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
          <CvHeader position={`Senior Data Platform/SRE Engineer`} />
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
                    Aspiring <strong>problem solver</strong> & Data Platform engineer
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
                    <strong>Experience:</strong> Infrastructure as code, container technologies, 
                    automation, GitOps, AWS cloud, CI/CD pipelines
                    platform & site reliability engineering
                  </li>
                  <li itemProp="itemListElement">
                    <strong>Languages:</strong> <strong>Python</strong>, Golang, Shell
                  </li>
                  <li itemProp="itemListElement">
                    <strong>IAC tools:</strong> Terraform, cloudformation, crossplane, ansible
                  </li>
                  <li itemProp="itemListElement">
                    <strong>containerization:</strong> Docker, Kubernetes, cri-o.
                  </li>
                  <li itemProp="itemListElement">
                    <strong>Software Engineering</strong>: Domain-Driven Design,
                    SOLID, System Design
                  </li>
                  <li itemProp="itemListElement">
                    <strong>Management</strong>: Leading Scrum Teams, Product
                    Owning, Problem Framing, Developer Mentoring, Giving
                    Workshops
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
                    Senior Data Platform Engineer 
                  </strong>
                  , <span itemProp="name">Justeat Takeaway.com</span>; The Netherlands — April 2023 -
                  June 2024
                  <br />
                  <div className="job-description">
                    Have been working on infrastructure optimization and application deployment in Amazon EKS (Elastic Kubernetes Service), ensuring high availability and performance:
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
                    DevOps/Cloud Engineer
                  </strong>
                  , <span itemProp="name">System-Dynamics</span>; Paris, France — January 2020 to May 2020
                  <br />
                  <div className="job-description">
                    Have been working on implementing and managing server configurations and system deployment:
                    <ul>
                      <li>
                        Implemented Puppet (installation, configuration, management of facts, templates) for server configurations
                      </li>
                      <li>
                        Managed system deployment via Terraform (architecture creation and management in AWS)
                      </li>
                      <li>
                        Automated deployment with tools such as Git, Jenkins, Gitlab (CI/CD), and Docker
                      </li>
                      <li>
                        Documented the solutions put in place
                      </li>
                      <li>
                        Served as a Linux/DevOps trainer
                      </li>
                    </ul>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Jenkins, Linux (Debian), AWS, Docker, Puppet, Terraform, GIT, Python, Perl, LDAP
                    </li>
                  </ul>
                </li>
                <li
                  itemScope
                  itemType="http://schema.org/Organization"
                  className="job"
                >
                  <strong itemProp="jobTitle">
                    Integration and System Engineer
                  </strong>
                  , <span itemProp="name">SOFRECOM</span>; Tunis, Tunisia — August 2018 - December 2019
                  <br />
                  <div className="job-description">
                    Have been working on updating technical documentation, configuring systems, and supporting Orange subsidiaries:
                    <ul>
                      <li>
                        Updated operational technical documentation (diagrams, operating modes, etc.)
                      </li>
                      <li>
                        Configured monitoring metrics
                      </li>
                      <li>
                        Made the requests to open the necessary flows
                      </li>
                      <li>
                        Created and managed system files (ext4, xfs, LVM)
                      </li>
                      <li>
                        Maintained and executed the Disaster Recovery Plan (DRP)
                      </li>
                      <li>
                        Managed systems and provided support for Orange subsidiaries
                      </li>
                      <li>
                        Trained and supported technical support teams during production implementation
                      </li>
                    </ul>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Linux, Grafana, Cloud, Load Balancer (HAProxy, Nginx), MySQL, Python, Docker, Ansible
                    </li>
                  </ul>
                </li>

                <li
                  itemScope
                  itemType="http://schema.org/Organization"
                  className="job"
                >
                  <strong itemProp="jobTitle">
                    Java/Angular Development Engineer
                  </strong>
                  , <span itemProp="name">SOFRECOM</span>; Tunis, Tunisia
                  <br />
                  <div className="job-description">
                    Worked on developing a platform to manage the training catalog, session plans, and analyze indicators after training monitoring:
                    <ul>
                      <li>
                        Developed and maintained the platform using Java and Angular 4
                      </li>
                      <li>
                        Utilized technologies like NodeJS, ExpressJS, and MongoDB for backend development
                      </li>
                      <li>
                        Integrated Hibernate and Spring BOOT for enhanced application performance and management
                      </li>
                      <li>
                        Worked with MySQL for database management and operations
                      </li>
                      <li>
                        Ensured seamless operation on Linux RedHat environment
                      </li>
                    </ul>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Linux RedHat, NodeJS, ExpressJS, MongoDB, Angular 4, Hibernate, Spring BOOT, MySQL
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
                      href="https://medium.com/@seifeddinerajhi"
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
