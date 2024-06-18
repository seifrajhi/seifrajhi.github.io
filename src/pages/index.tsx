import * as React from "react"

import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/theme/layout"
import Seo from "../components/seo/seo"
import PersonRichSnippet from "../components/seo/person-snippet"
import Avatar from "../components/homepage/avatar"
import ThemeSwitcher from "../components/theme/theme-switcher"
import ReactRotatingText from "react-rotating-text"
import MainNavigation from "../components/main-navigation"
import BlogTeaser from "../components/blog/blog-teaser"
import ThoughtTeaser from "../components/thoughts/thought-teaser"
import SocialLinks from "../components/homepage/SocialLinks"
import NNBackground from "../components/nn-design/nn-background"
import Footer from "../components/footer"

import "./Index.css"

const shuffleArray = (strings: string[]) =>
  strings.sort(() => Math.random() - 0.5)

const titles: string[] = shuffleArray([
  "DevOps Enginerr 🛠",
  "Python Enthusiast 🐹",
  "Container Nerd 🧠",
  "CLoud Engineer 🔬",
  "Passive Traveler 🏕",
  "Open Source Contributor 👨‍👩‍👧‍👦",
  "3x AWS Certified 🏅",
  "Problem Solver 🧠",
  "Tea Guy 🍵",
  "Pythonista 🐍",
  "Idea Generator 💡",
  "Scooter Driver 🛴",
  "Software Engineer 👨‍💻",
  "Life Explorer 🧗‍♂️",
  "CKA Certified 🏅",
  "Science Learner 🚀",
  "Rookie Hacker 🔐",
  "Lifelong Student 📚",
  "AI Evangelist 🔮",
  "Hobby Blogger ✍️",
])

const IndexPage = (): JSX.Element => {
  const { recentPosts, recentThoughts } = useStaticQuery(
    graphql`
      query {
        recentPosts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 2
          filter: {
            fileAbsolutePath: { regex: "/(blog)/" }
            frontmatter: { published: { eq: true } }
          }
        ) {
          edges {
            node {
              timeToRead
              frontmatter {
                id
                humanDate: date(formatString: "MMM D, YYYY")
                fullDate: date(formatString: "YYYY-MM-DD")
                path
                title
                keywords
                excerpt
                cover {
                  childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                  }
                }
              }
            }
          }
        }
        recentThoughts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 3
          filter: {
            fileAbsolutePath: { regex: "/(thoughts)/" }
            frontmatter: { published: { eq: true } }
          }
        ) {
          edges {
            node {
              id
              timeToRead
              excerpt(pruneLength: 100)
              frontmatter {
                humanDate: date(formatString: "MMM D, YYYY")
                fullDate: date(formatString: "YYYY-MM-DD")
                path
                title
                keywords
                cover {
                  childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  return (
    <Layout>
      <Seo
        title="Saifeddine Rajhi - Machine Learning and Software Engineer, Life Explorer"
        isUniqueTitle={true}
        className="home-page-v2"
        pagePath="/"
      />
      <main className="homepagev2">
        <div className="intro">
          <div id="hero-header" className="hero-header homepage-sidebar">
            <NNBackground />
            <figure className="hero-intro">
              <div className="logo">
                <div className="avatar">
                  <Avatar />
                </div>
              </div>
              <h1 className="name">
                <span className="first-name">Saifeddine</span>{" "}
                <span className="second-name">Rajhi</span>
              </h1>
              <div className="title">
                <ReactRotatingText items={titles} />
              </div>
              <MainNavigation space={"homepage"} />
              <SocialLinks showPatreon={true} iconSize="sm" />
              <div className="theme-switcher">
                <ThemeSwitcher />
              </div>
            </figure>
          </div>
        </div>
        <div className="mylife">
          <div>
            <p className="hey">Hey,</p>
            <p>
              My name is Saifeddine <span role="img">👋</span>
            </p>
            <p>
              I'm a Senior Platform Engineer, DevOps Geek and
              Life Explorer.
            </p>
          </div>
          <div>
            <h2 className="activity-title">Learn & Share</h2>
            <div>
              <p>
                I'm a lifetime learner interested in a broad variety of topics:
                Containers and Cloud, Science-related Theory, Computer
                Science, Software Engineering, Distributed System Design,
                AI and so on.
              </p>
              <p>
                When I have spare time, I enjoy putting together my knowledge
                about those topics and share with others.
              </p>
              <div className="recent-posts">
                {recentPosts.edges.map(
                  ({ node: { timeToRead, frontmatter } }) => (
                    <BlogTeaser
                      key={frontmatter.id}
                      id={frontmatter.id}
                      title={frontmatter.title}
                      url={frontmatter.path}
                      timeToRead={timeToRead}
                      publishedHumanDate={frontmatter.humanDate}
                      publishedFullDate={frontmatter.fullDate}
                      excerpt={frontmatter.excerpt}
                      cover={frontmatter.cover.childImageSharp.gatsbyImageData}
                      keywords={frontmatter.keywords}
                    />
                  )
                )}
              </div>
              <div className="all-button-wrapper">
                <a className="read-all-button" href={"/blog/"}>
                  Read All Posts
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="activity-title">Think & Write</h2>
            <div>
              <p>
                Another thing I like to do is to explore this world, think about
                its components, their interconnections and finally capture my
                observations and thoughts.
              </p>
              <p>
                These thoughts are usually about self-development, management
                and people perceptions and mindsets.
              </p>
              <div className="recent-thoughts">
                {recentThoughts.edges.map(
                  ({ node: { id, timeToRead, excerpt, frontmatter } }) => (
                    <ThoughtTeaser
                      key={id}
                      title={frontmatter.title}
                      url={frontmatter.path}
                      timeToRead={timeToRead}
                      publishedHumanDate={frontmatter.humanDate}
                      publishedFullDate={frontmatter.fullDate}
                      excerpt={excerpt}
                      cover={frontmatter.cover.childImageSharp.gatsbyImageData}
                    />
                  )
                )}
              </div>
              <div className="all-button-wrapper">
                <a className="read-all-button" href={"/thoughts/"}>
                  Read All Thoughts
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <PersonRichSnippet />
    </Layout>
  )
}

export default IndexPage
