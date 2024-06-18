import React from "react"
import { graphql } from "gatsby"

import loadable from "@loadable/component"

import ViewPageHeader from "../components/theme/view-page-header"
import MainNavigation from "../components/main-navigation"
import BlogPost from "../components/blog/blog-post"
import BlogNavigation from "../components/blog/blog-navigation"
import Layout from "../components/theme/layout"
import Seo from "../components/seo/seo"
import ShareBlock from "../components/thoughts/share-block"
import ArticleRichSnippet from "../components/seo/article-snippet"
import BreadcrumbsSnippet from "../components/seo/breadcrumbs-snippet"
import Footer from "../components/footer"

import "katex/dist/katex.min.css"
import "./blog-view.css"

const NewsletterForm = loadable(() =>
  import("../components/blog/newsletter-form")
)
const BlogComments = loadable(() => import("../components/blog/comments"))

export default function Template({
  data,
  pageContext: { prevThought, nextThought },
}) {
  const {
    markdownRemark: {
      frontmatter: {
        id,
        path,
        title,
        humanDate,
        fullDate,
        keywords,
        cover: {
          childImageSharp: { gatsbyImageData },
        },
        coverCredits,
        excerpt,
      },
      html,
      rawMarkdownBody,
      timeToRead,
      wordCount: { words },
    },
  } = data

  return (
    <Layout>
      <Seo
        title={`${title} - Blog`}
        className="blogpost-view-page"
        pagePath={path}
        imagePath={gatsbyImageData.images.fallback.src}
        ogType="article"
        description={excerpt}
        keywords={keywords}
        meta={[]}
      />
      <div className="blogpost-header">
        <ViewPageHeader spaceTitle="Blog" spaceLink="/blog/" />
        <MainNavigation space={"blog"} />
      </div>
      <main>
        <BlogPost
          id={id}
          title={title}
          timeToRead={timeToRead}
          publishedHumanDate={humanDate}
          publishedFullDate={fullDate}
          keywords={keywords}
          cover={gatsbyImageData}
          coverCredits={coverCredits}
          contentHtml={html}
        />
        <ShareBlock title={title} path={path} tags={keywords} />
        <NewsletterForm />
        <BlogComments />
      </main>
      <aside className="blogpost-sidebar">
        <BlogNavigation prev={prevThought} next={nextThought} />
      </aside>
      <Footer />
      <ArticleRichSnippet
        title={title}
        path={path}
        datePublished={fullDate}
        dateModified={fullDate} // gitLogLatestDate
        content={rawMarkdownBody}
        wordCount={words}
        keywords={keywords}
        cover={gatsbyImageData}
        articleSection={"Technical Blog"}
        genre={[
          "machine learning",
          "software engineering",
          "science",
          "deep learning",
          "statistics",
        ]}
      />
      <BreadcrumbsSnippet crumbs={[{ "/blog/": "Blog" }, { [path]: title }]} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      rawMarkdownBody
      wordCount {
        words
      }
      frontmatter {
        id
        path
        humanDate: date(formatString: "MMM D, YYYY")
        fullDate: date(formatString: "YYYY-MM-DD")
        title
        keywords
        excerpt
        cover {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        coverCredits
      }
    }
  }
`
