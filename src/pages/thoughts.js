import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/theme/layout"
import Seo from "../components/seo/seo"
import MainNavigation from "../components/main-navigation"
import ThoughtAuthor from "../components/thoughts/thought-author"
import ThemeSwitcher from "../components/theme/theme-switcher"
import ThoughtTeaser from "../components/thoughts/thought-teaser"
import BreadcrumbsSnippet from "../components/seo/breadcrumbs-snippet"
import Footer from "../components/footer"

import "./thoughts.css"

class ThoughtListPage extends Component {
  render() {
    const {
      data: {
        socialImage,
        allMarkdownRemark: { edges },
      },
    } = this.props

    return (
      <Layout>
        <Seo
          title="Thoughts"
          pagePath="/thoughts/"
          className="thoughts-list-page"
          description="Thoughts and experience that will help you to go through your life in the very best way"
          imagePath={socialImage.publicURL}
          keywords={[
            "thoughts",
            "opinion",
            "life exploring",
            "psychology",
            "Saifeddine Rajhi thoughts",
            "Saifeddine Rajhi thoughts",
            "life",
            "people",
            "management",
          ]}
          meta={[]}
        />
        <div className="thoughts-wrapper">
          <h1 className="thoughts-title">Thoughts</h1>
          <aside className="thought-sidebar">
            <ThoughtAuthor />
            <MainNavigation space={"thoughts"} />
            <div className="theme-switcher">
              <ThemeSwitcher />
            </div>
          </aside>
          <main className="thoughts-list">
            {edges.map((thought) => (
              <ThoughtTeaser
                key={thought.node.id}
                title={thought.node.frontmatter.title}
                url={thought.node.frontmatter.path}
                timeToRead={thought.node.timeToRead}
                publishedHumanDate={thought.node.frontmatter.humanDate}
                publishedFullDate={thought.node.frontmatter.fullDate}
                excerpt={thought.node.excerpt}
                cover={
                  thought.node.frontmatter.cover.childImageSharp.gatsbyImageData
                }
              />
            ))}
          </main>
          <div className="clearfix" />
        </div>
        <Footer />
        <BreadcrumbsSnippet crumbs={[{ "/thoughts/": "Thoughts" }]} />
      </Layout>
    )
  }
}

export default ThoughtListPage

export const pageQuery = graphql`
  query ThoughtListQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fileAbsolutePath: { regex: "/(thoughts)/" }
        frontmatter: { published: { eq: true } }
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          timeToRead
          frontmatter {
            humanDate: date(formatString: "MMM D, YYYY")
            fullDate: date(formatString: "YYYY-MM-DD")
            path
            title
            cover {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 700
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
    socialImage: file(relativePath: { eq: "blog/roman-glushko-thoughts.jpg" }) {
      publicURL
    }
  }
`
