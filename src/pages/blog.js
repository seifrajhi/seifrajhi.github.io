import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/theme/layout"
import Seo from "../components/seo/seo"
import ViewPageHeader from "../components/theme/view-page-header"
import MainNavigation from "../components/main-navigation"
import BlogTeaser from "../components/blog/blog-teaser"
import ThemeSwitcher from "../components/theme/theme-switcher"
import BreadcrumbsSnippet from "../components/seo/breadcrumbs-snippet"
import Footer from "../components/footer"

import "./blog.css"

class BlogListPage extends Component {
  render() {
    const {
      data: {
        allMarkdownRemark: { edges },
      },
    } = this.props

    return (
      <Layout>
        <Seo
          title="Blog"
          pagePath="/blog/"
          className="blog-list-page"
          description="Technical blog about Platform engineering, data science, math and software engineering"
          keywords={[
            "technical blog",
            "kubernetes",
            "AWS",
            "Platform engineer blog",
            "kubernetes",
            "engineering",
            "Cloud engineering",
            "Saifeddine Rajhi blog",
            "Saif Rajhi blog",
          ]}
          meta={[]}
        />
        <div className="blog-listing-wrapper">
          <aside className="blog-sidebar">
            <div className="blog-header">
              <ViewPageHeader
                spaceTitle="Blog"
                spaceLink="/blog/"
                isListing={true}
              />
              <MainNavigation space={"blog"} />
            </div>
            <div className="blog-intro">
              Technical notes about data Platform engineering, SRE, containers and
              cloud ecosystems. Recording what I learn everyday.
            </div>
            <div className="misc">
              <div className="theme-switcher">
                <ThemeSwitcher />
              </div>
            </div>
          </aside>
          <main
            data-nosnippet=""
            className={`blog-list blog-grid ${!edges.length ? "no-posts" : ""}`}
          >
            {!edges.length && (
              <div className="no-posts-placeholder">
                Great posts will be here as soon as my muse comes back to me{" "}
                <span role="img" aria-label="magic will happen soon">
                  💫
                </span>{" "}
                <br />
                Come back soon{" "}
                <span aria-label="bye" role="img">
                  👋
                </span>
              </div>
            )}
            {edges.map(
              ({
                node: {
                  timeToRead,
                  frontmatter: {
                    id,
                    title,
                    path,
                    humanDate,
                    fullDate,
                    excerpt,
                    keywords,
                    cover: {
                      childImageSharp: { gatsbyImageData },
                    },
                  },
                },
              }) => (
                <BlogTeaser
                  id={id}
                  key={id}
                  title={title}
                  url={path}
                  timeToRead={timeToRead}
                  publishedHumanDate={humanDate}
                  publishedFullDate={fullDate}
                  excerpt={excerpt}
                  cover={gatsbyImageData}
                  keywords={keywords}
                />
              )
            )}
          </main>
          <div className="clearfix" />
        </div>
        <Footer />
        <BreadcrumbsSnippet crumbs={[{ "/blog/": "Blog" }]} />
      </Layout>
    )
  }
}

export default BlogListPage

export const pageQuery = graphql`
  query BlogListQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
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
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 620
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`
