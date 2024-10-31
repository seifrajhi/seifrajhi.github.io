import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/theme/layout"
import Seo from "../components/seo/seo"
import MainNavigation from "../components/main-navigation"
import TalkAuthor from "../components/talks/talk-author"
import ThemeSwitcher from "../components/theme/theme-switcher"
import TalkTeaser from "../components/talks/talk-teaser"
import BreadcrumbsSnippet from "../components/seo/breadcrumbs-snippet"
import Footer from "../components/footer"

import "./talks.css"

class TalkListPage extends Component {
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
          title="Talks"
          pagePath="/talks/"
          className="talks-list-page"
          description="Talks and experience that will help you to go through your life in the very best way"
          imagePath={socialImage.publicURL}
          keywords={[
            "talks",
            "opinion",
            "life exploring",
            "psychology",
            "Saifeddine Rajhi talks",
            "Saifeddine Rajhi talks",
            "life",
            "people",
            "management",
          ]}
          meta={[]}
        />
        <div className="talks-wrapper">
          <h1 className="talks-title">Talks</h1>
          <aside className="talk-sidebar">
            <TalkAuthor />
            <MainNavigation space={"talks"} />
            <div className="theme-switcher">
              <ThemeSwitcher />
            </div>
          </aside>
          <main className="talks-list">
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
                <TalkTeaser
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
        <BreadcrumbsSnippet crumbs={[{ "/talks/": "Talks" }]} />
      </Layout>
    )
  }
}

export default TalkListPage

export const pageQuery = graphql`
  query TalkListQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fileAbsolutePath: { regex: "/(talks)/" }
        frontmatter: { published: { eq: true } }
      }
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            id
            excerpt
            keywords
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
    socialImage: file(relativePath: { eq: "blog/seifrajhi-kcd-utrecht.jpg" }) {
      publicURL
    }
  }
`
