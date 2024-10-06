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
               <br></br>
              <dl className="notop-margin">
                <dt>
                  <h2 className="notop-margin">
                    <span itemProp="name">Contact</span>
                  </h2>
                </dt>
                <ul>
                  <li itemProp="itemListElement">📅 30 years old</li>
                  <li itemProp="itemListElement">
                  📧&nbsp;&nbsp;<a href="mailto:rajhiseif@gmail.com">rajhiseif@gmail.com</a>
                  </li>
                  <li itemProp="itemListElement">📞 +31  06 43 28 32 01</li>
                  <li itemProp="itemListElement">
                   📍 Hengelosestraat 32-404, 7514 AH Enschede, Netherlands
                  </li>
                </ul>
              </dl>
            </section>


           <section itemScope itemType="http://schema.org/ItemList">
            <dl>
              <dt>
                <h2>
                  <span itemProp="name">Soft Skills</span>
                </h2>
              </dt>
              <ul>
                <li itemProp="itemListElement">
                  Aspiring problem solver & passionate DevOps Engineer with a proactive approach to challenges
                </li>
                <li itemProp="itemListElement">
                  7+ years of experience in cloud computing
                </li>
                <li itemProp="itemListElement">
                  5+ years of experience in automation and containers 
                </li>
                <li itemProp="itemListElement">
                  Expertise in a broad variety of technical, business, and management topics
                </li>
                <li itemProp="itemListElement">
                  Constant, quick & avid learner
                </li>
                <li itemProp="itemListElement">
                Lifelong learner with a keen interest in staying updated with the latest industry trends and technologies
                </li>
                <li itemProp="itemListElement">Positive and collaborative attitude</li>
                <li itemProp="itemListElement">
                  <strong>Platform Engineering:</strong> Platform Engineering: Skilled in creating, enhancing, and supporting scalable and reliable platforms, with a strong emphasis on automation, infrastructure as code, and cloud-native technologies
                </li>
                <li itemProp="itemListElement">
                  <strong>Management:</strong> Leading Scrum Teams, Product Owning, Problem Framing, Developer Mentoring, Giving Workshops
                </li>
              </ul>
            </dl>
          </section>

          <section itemType="http://schema.org/ItemList">
            <dl>
              <dt>
                <h2>
                  <span itemProp="name">Technical Skills</span>
                </h2>
              </dt>
              <ul>
                <li itemProp="itemListElement">
                  <strong>Experience:</strong> Infrastructure as code, container technologies, automation, GitOps, AWS cloud, CI/CD pipelines, platform & site reliability engineering
                </li>
                <li itemProp="itemListElement">
                  <strong>Languages:</strong> Python, Golang, Shell
                </li>
                <li itemProp="itemListElement">
                  <strong>IAC Tools:</strong> Terraform, CloudFormation, Crossplane, Ansible
                </li>
                <li itemProp="itemListElement">
                  <strong>Containerization:</strong> Docker, Kubernetes, cri-o
                </li>
                <li itemProp="itemListElement">
                  <strong>DevOps & Cloud:</strong> Docker, Skaffold, Containers, Jenkins, Git, Ansible, AWS, Kubernetes, EKS, Atlantis, Vault, Consul, Packer, Serverless, Sonar, Dapr, Backstage, IDP
                </li>
                <li itemProp="itemListElement">
                  <strong>Web Development:</strong> HTML5, JavaScript
                </li>
                <li itemProp="itemListElement">
                  <strong>Software Development:</strong> C/C++, Python, GoLang, PL/SQL, Shell
                </li>
                <li itemProp="itemListElement">
                  <strong>Database:</strong> SQL/MySQL, Oracle, MongoDB, RDS, Aurora
                </li>
                <li itemProp="itemListElement">
                  <strong>Operating Systems:</strong> Linux Red Hat, Ubuntu, Mint, CentOS, Alpine
                </li>
                <li itemProp="itemListElement">
                  <strong>Virtualization:</strong> AWS, VMware vSphere, Hyper-V, Docker, OpenShift
                </li>
                <li itemProp="itemListElement">
                  <strong>Methodologies:</strong> Agile Scrum, Kanban
                </li>
                <li itemProp="itemListElement">
                  <strong>CI/CD and IAC:</strong> Jenkins, Nexus, GitLab, Docker, Ansible, Puppet, Helm, Helmfile, Kustomize, Crossplane, Terraform, OpenTofu, Terragrunt (DRY IAC)
                </li>
                <li itemProp="itemListElement">
                  <strong>Service Mesh:</strong> Istio, Cilium, Linkerd
                </li>
                <li itemProp="itemListElement">
                  <strong>API Gateway:</strong> Kong, Apigee, AWS API Gateway
                </li>
                <li itemProp="itemListElement">
                  <strong>GitOps:</strong> ArgoCD, Flux, Jenkins X, Tekton, Spinnaker
                </li>
                <li itemProp="itemListElement">
                  <strong>Software:</strong> Apache Httpd, NGINX, HA proxy, Postfix, iptables, Tomcat, Eclipse, IntelliJ, VS Code, Maven
                </li>
                <li itemProp="itemListElement">
                  <strong>Monitoring and Logging:</strong> DataDog, Splunk, Prometheus, Grafana, ELK Stack, APM Thanos, OpenTelemetry, CloudWatch, Nagios, Zabbix
                </li>
                <li itemProp="itemListElement">
                  <strong>Directories:</strong> OpenLDAP, Active Directory
                </li>
                <li itemProp="itemListElement">
                  <strong>Storage:</strong> NAS (NFS, CIFS), SAN (iSCSI), EFS
                </li>
              </ul>
            </dl>
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
                  , <span itemProp="name">JustEat Takeaway.com</span>; Enschede, Netherlands — April 2023 – Present
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
                  , <span itemProp="name">SOFRECOM</span>; Tunis, Tunisia — June 2017 - July 2018
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

