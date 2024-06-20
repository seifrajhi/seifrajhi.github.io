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
          <CvHeader position={`ML/DL Engineer CV`} />
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
                  <strong>Platform engineer Nanodegree</strong>, 2020-2021
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
            <section className="projects">
              <h2 className={`notop-margin`}>
                <span>Projects</span>
              </h2>
              <ul>
                <li className="project">
                  <h3>Wireframe Scanner</h3>
                  <div className="project-description">
                    <a href="https://www.commerceframe.com/" target="blank">
                      CommerceFrame
                    </a>
                    , my side project about swift eCommerce wireframing, needs a
                    functionality to import wireframes that were drawn on a
                    piece of paper or a whiteboard. The project includes problem
                    framing, collecting and labeling dataset.
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Problem Framing, Data
                      Collection, Data Labeling, Image Data, Python, PyTorch,
                      Object Detection
                    </li>
                  </ul>
                </li>
                <li className="project">
                  <h3>Rock, Paper, Scissors Game</h3>
                  <div className="project-description">
                    Trained a model to recognize hand forms of rock, paper,
                    scissors and incorporate it into a game. Collected hundreds
                    of images in order to improve the model accuracy. <br />
                    <br />
                    Ended up with a model that is <strong>
                      90% accurate
                    </strong>{" "}
                    and recognizes common ways to shape RPS forms. The model was{" "}
                    <strong>deployed as a serverless</strong> application using
                    Tensorflow.js.
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Problem Framing, Data
                      Collection, Image Data, Python, Tensorflow, Tensorflow.js
                    </li>
                    <li>
                      Links:{" "}
                      <a href="/lab/rock-paper-scissors/" target="blank">
                        Live Demo
                      </a>{" "}
                      •{" "}
                      <a
                        href="https://github.com/seifrajhi/rock-paper-scissors"
                        target="blank"
                      >
                        GitHub
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="project">
                  <h3>[Kaggle] Shopee - Price Match Guarantee</h3>
                  <div className="project-description">
                    The Shopee marketplace has a price match guarantee program.
                    They needed a model that could automate the process of
                    finding marketplace lots with similar product offerings and
                    prices, despite marketing strategy, product titles and
                    images which merchants might use.
                    <br />
                    <br />
                    Got to Top 45% of submitters on Kaggle. Got{" "}
                    <a
                      href="https://www.kaggle.com/c/shopee-product-matching/discussion/236496"
                      target="blank"
                    >
                      gold and silver medals
                    </a>{" "}
                    for providing deep insights on the domain and problem goal.
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: eCommerce, Tabular & Image
                      Data, Python, Keras, Data Processing, embeddings
                    </li>
                    <li>
                      Links:{" "}
                      <a
                        href="https://www.kaggle.com/c/shopee-product-matching"
                        target="blank"
                      >
                        Competition
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="project">
                  <h3>[Kaggle] HPA - Single Cell Classification</h3>
                  <div className="project-description">
                    Human Protein Atlas organization was interested in finding
                    patterns of protein distribution inside of the single cell.
                    This helped to understand role of different proteins in
                    disease development, medical treatment impact, etc.
                    <br />
                    Based on 150Gb of 4-layers human cells images, it was needed
                    to segment each cell and predict in which organelle of the
                    cell the protein of interest were located. Provided dataset
                    contained only inaccurate image-level labels (not directly
                    connected to particular cells).
                    <br />
                    <br />
                    Got to Top 15% of submitters on Kaggle.
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Biology, Image Medical Data,
                      Weakly-Supervised Learning, Data Analysis, Data
                      Processing, Instance Segmentation, Multi-Label
                      Classification
                    </li>
                    <li>
                      Links:{" "}
                      <a
                        href="https://www.kaggle.com/c/hpa-single-cell-image-classification"
                        target="blank"
                      >
                        Competition
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="other-projects">
                <input type="checkbox" id="other-projects-collapse" />
                <label htmlFor="other-projects-collapse">
                  <a>..click to show/hide other projects</a>
                </label>
                <ul className="other-projects-list">
                  <li className="project">
                    <h3>Mall Customer Segmentation</h3>
                    <div className="project-description">
                      Analyzed dataset of mall customers and segment them
                      according to their spending patterns.
                      <br />
                      <br />
                      Got{" "}
                      <a
                        href="https://www.kaggle.com/glushko/mall-customer-segmentation"
                        target="blank"
                      >
                        a silver medal on Kaggle
                      </a>{" "}
                      for the analysis.
                    </div>
                    <ul className="project-details">
                      <li>
                        <strong>Experience</strong>: Clustering, Tabular Data,
                        Data Analysis, Python, Scikit-Learn, Plotly, Seaborn
                      </li>
                      <li>
                        Links:{" "}
                        <a
                          href="https://www.kaggle.com/glushko/mall-customer-segmentation"
                          target="blank"
                        >
                          Modeling
                        </a>{" "}
                        •{" "}
                        <a
                          href="https://github.com/seifrajhi/kaggle-mall-customer-segmentation"
                          target="blank"
                        >
                          Github
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="project">
                    <h3>Digit Recognizer</h3>
                    <div className="project-description">
                      Built a classifier to predict handwritten digits.
                      <br />
                      <br />
                      Got to Top 5% of submitters on Kaggle.
                    </div>
                    <ul className="project-details">
                      <li>
                        <strong>Experience</strong>: Classification, Image Data,
                        Python, Keras, Scikit-Learn, CNN
                      </li>
                      <li>
                        Links:{" "}
                        <a
                          href="https://www.kaggle.com/glushko/digit-recognizer-0-99657-3-approaches-tpu"
                          target="blank"
                        >
                          Modeling
                        </a>{" "}
                        •{" "}
                        <a
                          href="https://github.com/seifrajhi/kaggle-digit-recognizer"
                          target="blank"
                        >
                          Github
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="project">
                    <h3>Wine Quality</h3>
                    <div className="project-description">
                      Automated wine quality analysis based on results of
                      physicochemical tests.
                    </div>
                    <ul className="project-details">
                      <li>
                        <strong>Experience</strong>: Classification, Tabular
                        Data, Data Analysis, Python, Scikit-Learn
                      </li>
                      <li>
                        Links:{" "}
                        <a
                          href="https://www.kaggle.com/glushko/wine-quality-domain-driven-eda-part-i"
                          target="blank"
                        >
                          Data Analysis
                        </a>{" "}
                        •{" "}
                        <a
                          href="https://www.kaggle.com/glushko/wine-quality-modelling-part-ii"
                          target="blank"
                        >
                          Modeling
                        </a>{" "}
                        •{" "}
                        <a
                          href="https://github.com/seifrajhi/kaggle-wine-quality"
                          target="blank"
                        >
                          Github
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="project">
                    <h3>Ames House Pricing</h3>
                    <div className="project-description">
                      Modeled house prices based on Ames Housing Dataset.
                      <br /> <br />
                      Got to Top 4% of submitters on Kaggle.
                    </div>
                    <ul className="project-details">
                      <li>
                        <strong>Experience</strong>: Regression, Tabular Data,
                        Real Estate, Data Analysis, Python, Scikit-Learn,
                        XGBoost
                      </li>
                      <li>
                        Links:{" "}
                        <a
                          href="https://www.kaggle.com/glushko/house-prices-domain-driven-eda-part-i"
                          target="blank"
                        >
                          Data Analysis
                        </a>{" "}
                        •{" "}
                        <a
                          href="https://www.kaggle.com/glushko/house-prices-regression-modelling-part-ii"
                          target="blank"
                        >
                          Modeling
                        </a>{" "}
                        •{" "}
                        <a
                          href="https://github.com/seifrajhi/kaggle-house-prices"
                          target="blank"
                        >
                          Github
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <span className="other-projects-link">
                Other projects can be found on{" "}
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/seifrajhi?tab=repositories&q=platform-engineering"
                >
                  GitHub
                </a>{" "}
                and{" "}
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.kaggle.com/glushko/code"
                >
                  Kaggle
                </a>
              </span>
            </section>
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
                    Software Engineer II (R&D, Notebooks)
                  </strong>
                  , <span itemProp="name">DataRobot</span>; Ukraine — Nov 2021 -
                  Present (7 months)
                  <br />
                  <div className="job-description">
                    Have been working on code execution system for data
                    scientists based on the microservice multi-language (Python,
                    Node.js, GoLang) architecture:
                    <ul>
                      <li>
                        Designed, implemented and owned the deployment of the
                        whole system to AWS based on Kubernetes, Helm Charts and
                        ArgoCD as a gitOps CD
                      </li>
                      <li>
                        Designed a custom Kubernetes operator based on the
                        RedHat OperatorFramework (GoLang)
                      </li>
                      <li>
                        Designed and implemented a websocket mictoservice based
                        on Socket.IO and Node.JS
                      </li>
                      <li>
                        Implemented the central orchestration part of the
                        project (a Python-based microservice)
                      </li>
                      <li>
                        Worked and extended the Jenkins-based CI pipelines
                      </li>
                      <li>
                        Took active part in architectural discussions and
                        improvements, code reviews in a geographically
                        distributed team (Ukraine and East US timezones) of more
                        than 20 people. Effectively handled cross-team
                        communication with other DataRobot teams to resolve
                        roadblocks and meet project expectations and deadlines
                      </li>
                    </ul>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Python, Microservices, System
                      Design, Kubernetes, AWS EKS stack, GitOps, Jenkins,
                      Socket.IO
                    </li>
                  </ul>
                </li>
                <li
                  itemScope
                  itemType="http://schema.org/Organization"
                  className="job"
                >
                  <strong itemProp="jobTitle">
                    Software Engineer (R&D, AI Apps)
                  </strong>
                  , <span itemProp="name">DataRobot</span>; Ukraine — Aug-Nov
                  2021 (4 months)
                  <br />
                  <div className="job-description">
                    <ul>
                      <li>
                        Designed and implement an internal framework for
                        building ML-enabled applications using DataRobot
                        platform powered by modern Python stack (Flask,
                        Pydantic, FastAPI).
                      </li>
                      <li>
                        Using the framework, I have took part in implementation
                        a complaint review application for a US company from the
                        healthcare sector. Took part in complaint analysis and
                        NLP modeling pipeline using Huggingface transformers
                        stack.
                      </li>
                      <li>
                        Took part in configuring and troubleshooting
                        Kubernetes-based environments deployed on Gitlab
                        instances
                      </li>
                    </ul>
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Problem Solving, Python,
                      Software Architecture, NLP, Huggingface Transformers,
                      Platform engineer, Kubernetes, Gitlab CI/CD
                    </li>
                  </ul>
                </li>
                <li
                  itemScope
                  itemType="http://schema.org/Organization"
                  className="job"
                >
                  <strong itemProp="jobTitle">
                    Tech Lead / Software Developer
                  </strong>
                  , <span itemProp="name">Atwix</span>; Ukraine — 2017-2020 (3.5
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
                      <strong>Experience</strong>: Problem Solving, eCommerce,
                      Marketing, Leadership, System Design, Problem Framing
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
