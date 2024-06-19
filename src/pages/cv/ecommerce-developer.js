import React from "react"

import Layout from "../../components/theme/layout"
import Seo from "../../components/seo/seo"
import MainNavigation from "../../components/main-navigation"
import CvHeader from "../../components/cv/cv-header"
import ThemeSwitcher from "../../components/theme/theme-switcher"
import SocialLinks from "../../components/homepage/SocialLinks"
import BreadcrumbsSnippet from "../../components/seo/breadcrumbs-snippet"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

import "./cv.css"

const PlatformEngineerCV = () => {
  return (
    <Layout>
      <Seo
        isUniqueTitle={true}
        title={"Saifeddine Rajhi's eCommerce Magento Developer CV"}
        className="cv-view-page"
        pagePath="/cv/ecommerce-developer/"
        ogType="website"
        description="Saifeddine Rajhi's eCommerce Magento Developer CV"
        keywords={[
          "magento software engineer",
          "ecommerce developer",
          "cv",
          "certified ecommerce magento developer cv",
          "ecommerce magento developer resume",
        ]}
      />
      <main
        itemScope
        itemType="http://schema.org/Person"
        className="cv cv-ecommerce-developer"
      >
        <div
          className="pdf-badge"
          onClick={() => {
            trackCustomEvent({
              category: "cv",
              action: "download",
              label: "ecommerce-developer",
            })

            typeof window !== "undefined" &&
              typeof window.gtag !== "undefined" &&
              window.gtag("event", "download", {
                event_category: "cv",
                event_label: "ecommerce-developer",
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
          <CvHeader position={`eCommerce Magento Developer CV`} />
          <SocialLinks showPatreon={false} />
        </header>
        <div className="cv-content">
          <div className="cv-content-column additional-column">
            <section
              className="profile"
              itemScope
              itemType="http://schema.org/ItemList"
            >
              <dl className="notop-margin">
                <dt>
                  <h2 className="notop-margin">
                    <span itemProp="name">Profile</span>
                  </h2>
                </dt>
                <ul>
                  <li itemProp="itemListElement">
                    Aspiring <strong>Problem Solver</strong> & Passionate
                    Software Engineer
                  </li>
                  <li itemProp="itemListElement">
                    <strong>5+ years</strong> of experience in{" "}
                    <strong>software engineering</strong> and eCommerce
                    development
                  </li>
                  <li itemProp="itemListElement">
                    <strong>3+ years</strong> of experience in{" "}
                    <strong>technical management of scrum teams</strong>
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
            <section className="skills" itemType="http://schema.org/ItemList">
              <dl>
                <dt>
                  <h2>
                    <span itemProp="name">Skills</span>
                  </h2>
                </dt>
                <ul>
                  <li itemProp="itemListElement">
                    <strong>Type of Services</strong>: Building eCommerce stores
                    from scratch, Store Maintenance, Performance and SEO Audits,
                    Extending of the default Magento setup, ERP/CRM/SaaS
                    Integrations
                  </li>
                  <li itemProp="itemListElement">
                    <strong>Languages</strong>: PHP, Python, Golang, WebDev
                    Stack (JS & HTML5 & CSS3)
                  </li>
                  <li itemProp="itemListElement">
                    <strong>Platforms</strong>: Magento 2 Open Source and Adobe
                    Commerce(former Magento 2 Commerce), Adobe Commerce Cloud
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
            <section className="education">
              <h2>
                <span>Education</span>
              </h2>
              <ul>
                <li
                  itemScope
                  itemType="http://schema.org/EducationalOrganization"
                >
                  <strong>Platform engineer Nanodegree</strong>, 2020-Present (8
                  months)
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
                  <h3>B2B US Electrical Manufacturer</h3>
                  <div className="project-description">
                    The client was a big midwest US-based manufacturer of power
                    units, electrical systems for home and office environments.
                    They did not have a solid eCommerce platform and a lot of
                    conversions happened during in-person sale meetings. Once
                    COVID-19 struck the world, it became hardly possible to work
                    that way. They urgently needed a viable eCommerce platform
                    that would begin <strong>digitalization</strong> inside of
                    the company. <br />
                    <br />
                    My team delivered their partner portal powered by{" "}
                    <strong>Adobe Commerce Cloud just in 6 weeks</strong>. This
                    included{" "}
                    <strong>
                      ERP and custom product configurator integrations,
                      importing all B2B and catalog
                    </strong>{" "}
                    information and other stuff required by a fully functional
                    store.
                    <br />
                    <br />
                    Also, I took part in concept creations for the further
                    features (package management capabilities for planned
                    orders, integration with support system, B2B shipping, etc)
                    and B2C branch of their business.
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Problem Framing, Requirement
                      Gathering, Direct work with client team, Concept Creating,
                      Adobe Commerce Cloud, Magento B2B, Building Magento 2
                      Store from scratch, Team Leading
                    </li>
                  </ul>
                </li>
                <li className="project">
                  <h3>B2C US Kitchen Furniture Manufacturer and Retailer</h3>
                  <div className="project-description">
                    The client was a number one US online retailer of kitchen
                    cabinets, sinks and other stuff needed for kitchen design
                    with its own manufacturing facilities on the east coast.
                    They got to the "Inc. 500" twice. <br />
                    <br />I was working on this project when it was on Magento
                    1. The major thing that we did was a{" "}
                    <strong>migration to Magento 2</strong>. It was the early
                    days of Magento 2 and the migration was not a trivial
                    process at all. It took us more than a year to migrate the
                    website. Migration included a few thousands of hours the
                    team spent on designing and implementing all custom
                    functionalities including a way to{" "}
                    <strong>run frequent sales</strong>,{" "}
                    <strong>
                      a workflow for kitchen design team to interact with
                      clients, custom gallery for inspiration and import of 1
                      million products
                    </strong>
                    . <br />
                    <br />
                    After successful migration, we had worked a few more years
                    on website support. During that phase, we implemented{" "}
                    <strong>
                      a workflow for contractors to work with the store in B2B
                      like manner, loyalty program, integrations with payment
                      methods
                    </strong>
                    , etc. <br />
                    <br />
                    Huge catalog prompted us to{" "}
                    <strong>
                      research ways to improve indexing and search systems.
                    </strong>{" "}
                    Besides that, we were working on improving website
                    performance by leveraging{" "}
                    <strong>ReactJS-based micro-frontend approach</strong>.
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Magento 2 Migration, Adobe
                      Commerce, Store Maintenance, Product Owning, Performance
                      Audits, SEO Audits, Concept Creation, Work With Client's
                      Team, Ongoing Improvement Sells, Magento Consulting,
                      Magento Upgrades, Adobe Commerce Cloud, Nexcess Hosting
                    </li>
                  </ul>
                </li>
                <li className="project">
                  <h3>Austrian B2C Bedroom Furniture Seller</h3>
                  <div className="project-description">
                    The client was a small Austrian-based bedroom furniture
                    company with up to 10 showrooms in Austria and Germany. They
                    sold beds, wardrobes, dressers that were made from 5 types
                    of aromatic wood, and breathable organic mattresses.
                    <br />
                    <br />
                    They were on Magento 1 and they asked us for migration to
                    Magento 2 Open Source. On Magento 1, they had{" "}
                    <strong>a lot of custom functionality</strong>. We spent
                    more than a year redesigning and implementing it on Magento
                    2. Since a major part of their sales came from showrooms, we
                    paid extra attention on{" "}
                    <strong>creating an omnichannel-like experience</strong> for
                    their customers. We developed a workflow for their showroom
                    stuff to let them guide and{" "}
                    <strong>
                      create quotes together with customers which came to the
                      store
                    </strong>
                    . Also, the client's team was interested in making changes
                    to most parts of the website frequently, so we provided them
                    a way to{" "}
                    <strong>
                      manage blocks of information on category and product pages
                      in an admin-friendly way.
                    </strong>
                    <br />
                    <br />
                    After migration, we worked on the ongoing support and
                    improvements to the store. We helped them{" "}
                    <strong>
                      integrate a new line of fast-to-deliver products with an
                      ability to manage orders that could contain regular and
                      this kind of products
                    </strong>
                    . We also made sure that they were using{" "}
                    <strong>
                      cost-efficient hosting plans while getting optimal user
                      experience by performing load tests
                    </strong>
                    .
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Magento 2 Migration, Concept
                      Creations, Team Leading, Performance Audits, SEO
                      Improvements, Ongoing Improvement Sells, Magento
                      Consulting, Magento Upgrades, Load Testing
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="other-projects">
                <input type="checkbox" id="other-projects-switcher" />
                <label htmlFor="other-projects-switcher">
                  <a>..click to show/hide other projects</a>
                </label>
                <ul className="other-projects-list">
                  <li className="project">
                    <h3>French Shipping Provider</h3>
                    <div className="project-description">
                      One of the biggest European shipping provider, based in
                      French, was looking to expand their integration with
                      existing eCommerce platforms. They had integrations with
                      WooCommerce and PrestaShop, and they wanted to bring
                      Magento 1 and Magento 2 to that list. <br />
                      <br />
                      My team was responsible for developing Magento 2 version
                      of the integration. We were following and adjusting
                      provided high-level concepts of the final result. <br />
                      <br />
                      After working on the project for a few months, we were
                      invited to the nearest office of the company for the final
                      tests. Me and a few fellows from the team were invited and{" "}
                      <strong>
                        I was handling all main communication and coordination
                        with the client team onsite
                      </strong>
                      .
                    </div>
                    <ul className="project-details">
                      <li>
                        <strong>Experience</strong>: Magento Module Development,
                        Team Leading, Integration with Third-Party Services,
                        Onsite Meetings with Client Team
                      </li>
                    </ul>
                  </li>
                  <li className="project">
                    <h3>UK Customer Review Service Provider</h3>
                    <div className="project-description">
                      A UK-based customer review service was looking for Magento
                      integration after being successfully used on WooCommerce
                      platform. <br />
                      <br />I was{" "}
                      <strong>
                        mainly responsible for the integration design and
                        development
                      </strong>
                      . After some time, I was included to{" "}
                      <strong>
                        the direct communication with client about ongoing
                        questions and clarifications
                      </strong>
                      .
                    </div>
                    <ul className="project-details">
                      <li>
                        <strong>Experience</strong>: Magento Module Development,
                        Communication with Client
                      </li>
                    </ul>
                  </li>
                  <li className="project">
                    <h3>US Cosmetics Reseller</h3>
                    <div className="project-description">
                      The client was running on the Magento 1 when I joined the
                      team. They were looking for the major website redesign and
                      improvements to customer experience.
                      <br />
                      <br />
                      In a scope of that plans, I was involved into{" "}
                      <strong>development of a customer quiz</strong> that
                      helped to select cosmetics based on the customer skin
                      types and preferences. In addition to that, I was
                      developing a feature to buy{" "}
                      <strong>
                        a customizable kit of products based on the quiz results
                      </strong>
                      .
                    </div>
                    <ul className="project-details">
                      <li>
                        <strong>Experience</strong>: Custom Functionality
                        Development, Design Adjustments, Store Maintenance,
                        Newsletter Integration
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
                  href="https://github.com/seifrajhi?tab=repositories"
                >
                  GitHub
                </a>{" "}
                and{" "}
          
              </span>
            </section>
            <section className="certifications">
              <h2>
                <span>Certifications</span>
              </h2>
              <ul>
                <li className="certification">
                  <strong>
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://www.credly.com/badges/85808e34-3436-407c-a087-71146c9d4caa"
                    >
                      Adobe Commerce Business Practitioner
                    </a>
                  </strong>
                  <br />
                  <div>
                    Certified on knowledge of{" "}
                    <strong>
                      general Magento architecture, list of out-of-the-box
                      features and usecases to apply them
                    </strong>
                    .
                  </div>
                </li>
                <li className="certification">
                  <strong>
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://www.credly.com/badges/6a093495-8d10-446f-a273-2a4da62402ec"
                    >
                      Adobe Commerce Developer
                    </a>
                  </strong>
                  <br />
                  <div>
                    Certified on knowing best practices related to{" "}
                    <strong>
                      Magento backend customizations and custom module
                      development
                    </strong>
                    .
                  </div>
                </li>
                <li className="certification">
                  <strong>
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://www.credly.com/badges/30795767-4b7d-4ef7-bd03-c2e3eecd9455"
                    >
                      Adobe Commerce JavaScript Developer
                    </a>
                  </strong>
                  <br />
                  <div>
                    Certified on knowing how to build complex{" "}
                    <strong>
                      JavaScript logic along the lines of Magento JavaScript
                      framework
                    </strong>
                    .
                  </div>
                </li>
                <li className="certification">
                  <strong>
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://www.credly.com/badges/e0813e5d-094f-496b-adf3-89916d9ff90f"
                    >
                      Adobe Commerce Cloud Developer
                    </a>
                  </strong>
                  <br />
                  <div>
                    Certified on{" "}
                    <strong>
                      building, running and deploying stores on Adobe Commerce
                      Cloud
                    </strong>
                    .
                  </div>
                </li>
              </ul>
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
                    Tech Lead / Software Developer
                  </strong>
                  , <span itemProp="name">Atwix</span>; Ukraine — 2017-2020 (3.5
                  years)
                  <br />
                  <div className="job-description">
                    I was responsible for{" "}
                    <strong>
                      leading different scrum teams (from 5 to 15 people incl.
                      SEs, QA, PM, DevOps)
                    </strong>{" "}
                    that worked on building stores from scratch and maintaining
                    them afterwards. I had close communications with project
                    stakeholders, participating in problem grooming, requirement
                    gathering and further translating that knowledge into
                    technical concepts and technical vision for my teams. <br />
                    <br />I was <strong>mentoring</strong> people in the team,
                    performing onboarding, code reviews and internal workshops
                    about various topics that the team faced. Worked on{" "}
                    <strong>
                      partnership and developed relationships with other tech
                      companies
                    </strong>{" "}
                    we worked with.
                    <br />
                    <br />
                    Also, I was{" "}
                    <strong>
                      owning all technical processes and constantly worked on
                      improving them
                    </strong>{" "}
                    and utilized new approaches and tools (like visual
                    regression tools, etc). Finally, I{" "}
                    <strong>
                      advocated the needs of software engineers and popularized
                      ideas
                    </strong>{" "}
                    of solution sharing inside of the company.
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Problem Solving, eCommerce,
                      Marketing, Leadership, System Design, Problem Framing,
                      Domain-Driven Design
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
                    I was part of different teams that worked on ongoing support
                    of existing eCommerce Magento projects and adding a new
                    functionality to projects that came.
                  </div>
                  <ul className="project-details">
                    <li>
                      <strong>Experience</strong>: Linux, Git, Docker, PHP,
                      MySQL, Elasticsearch, Redis
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
            <section
              className="leadership"
              itemScope
              itemType="http://schema.org/ItemList"
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
                    Engineering Team (3.5 years).
                  </li>
                  <li itemProp="itemListElement">
                    3 people I had mentored and worked for the longest time with{" "}
                    <strong>became technical leaders themselves</strong>.
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
            <section className="open-source-projects">
              <h2>
                <span>Open Source</span>
              </h2>
              <ul>
                <li>
                  <strong>Contributions to Magento 2 Open Source</strong>
                  <br />
                  <div>
                    Since 2017 I had been contributing to numerous of Magento
                    projects including Magento Core, Multi-Source Inventory,
                    GraphQl, DevDocs and PHPStorm Plugin.
                  </div>
                  <strong>Links</strong>:{" "}
                  <a
                    rel="me"
                    target="_blank"
                    rel="noopener"
                    href="https://opensource.magento.com/profile/seifrajhi/contribution_statistic"
                  >
                    Magento Community Portal
                  </a>
                </li>
                <li>
                  <strong>Tango</strong>
                  <br />
                  <div>
                    A cross-platform console tool for processing server logs and
                    generating useful reports based on them.
                  </div>
                  <strong>Links</strong>:{" "}
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://github.com/seifrajhi/tango"
                  >
                    Github
                  </a>{" "}
                  •{" "}
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://www.producthunt.com/posts/tango-8b7c5fe8-b795-4071-b479-ffa84ce4999b"
                  >
                    ProductHunt
                  </a>
                </li>
                <li>
                  <strong>Eyewear</strong>
                  <br />
                  <div>
                    A PoC of tool that analyzes Magento dataset growth over the
                    time.
                  </div>
                  <strong>Links</strong>:{" "}
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://github.com/seifrajhi/eyewear"
                  >
                    Github
                  </a>
                </li>
              </ul>
              <div className="other-projects">
                <input
                  type="checkbox"
                  id="other-open-source-projects-switcher"
                />
                <label htmlFor="other-open-source-projects-switcher">
                  <a>..click to show/hide other projects</a>
                </label>
                <ul className="other-projects-list">
                  <li>
                    <strong>DB Trimmer</strong>
                    <br />
                    <div>
                      A PoC of tool that is aimed to perform quick cleanup of
                      huge Magento datasets during dev environment creation
                    </div>
                    <strong>Links</strong>:{" "}
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://github.com/seifrajhi/db-trimmer"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <strong>Monolog Parser</strong>
                    <br />
                    <div>
                      A PHP parse of Monolog's log format that is used Magento
                      to store internal logs.
                    </div>
                    <strong>Links</strong>:{" "}
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://github.com/seifrajhi/monolog-parser"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <strong>GrumPHP Rules for Magento 2</strong>
                    <br />
                    <div>
                      A set of GrumPHP checks that automates preventing common
                      mistakes that Magento dev team may do.
                    </div>
                    <strong>Links</strong>:{" "}
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://github.com/seifrajhi/grumphp-magento2"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <strong>Magento 2 Dir Buster</strong>
                    <br />
                    <div>
                      A list of URL to check that should be protected on every
                      Magento store.
                    </div>
                    <strong>Links</strong>:{" "}
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://github.com/seifrajhi/magento2-dir-buster"
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </div>
            </section>
            <section itemScope itemType="http://schema.org/ItemList">
              <dl>
                <dt>
                  <h2>
                    <span itemProp="name">Hobby & Interests</span>
                  </h2>
                </dt>
                <ul>
                  <li itemProp="itemListElement">Scooter Driving</li>
                  <li itemProp="itemListElement">Self-Improvement</li>
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
        crumbs={[
          { "/cv/platform-engineer/": "Platform Engineer CV" },
        ]}
      />
    </Layout>
  )
}

export default PlatformEngineerCV
