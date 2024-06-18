import React from "react"
import { graphql, Link } from "gatsby"
import ThoughtAuthor from "../components/thoughts/thought-author"
import Thought from "../components/thoughts/thought"
import ThoughtNavigation from "../components/thoughts/thought-navigation"
import Layout from "../components/theme/layout"
import Footer from "../components/footer"
import Seo from "../components/seo/seo"
import NewsletterForm from "../components/blog/newsletter-form"
import ShareBlock from "../components/thoughts/share-block"
import BreadcrumbsSnippet from "../components/seo/breadcrumbs-snippet"
import ArticleRichSnippet from "../components/seo/article-snippet"

import "./ThoughtView.css"

export default function Template({
  data,
  pageContext: { prevThought, nextThought },
}) {
  const {
    markdownRemark: {
      frontmatter: {
        path,
        title,
        humanDate,
        fullDate,
        keywords,
        cover: {
          childImageSharp: { gatsbyImageData },
        },
        coverCredits,
      },
      html,
      rawMarkdownBody,
      timeToRead,
      excerpt,
      wordCount: { words },
    },
  } = data

  return (
    <Layout>
      <Seo
        title={`${title} - Thoughts`}
        className="thought-view-page"
        pagePath={path}
        imagePath={gatsbyImageData.images.fallback.src}
        ogType="article"
        description={excerpt}
        keywords={keywords}
        meta={[]}
      />
      <div className="thoughts-title">
        <Link to="/thoughts/">Thoughts</Link>
      </div>
      <main>
        <Thought
          title={title}
          timeToRead={timeToRead}
          publishedHumanDate={humanDate}
          publishedFullDate={fullDate}
          cover={gatsbyImageData}
          coverCredits={coverCredits}
          contentHtml={html}
        />
        <ShareBlock title={title} path={path} tags={keywords} />
        <NewsletterForm />
      </main>
      <aside className="thought-sidebar">
        <ThoughtAuthor />
        <ThoughtNavigation prev={prevThought} next={nextThought} />
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
        articleSection={"Thoughts"}
        genre={[
          "self-improvement",
          "management",
          "thoughts",
          "life experience",
          "life exploration",
        ]}
      />
      <BreadcrumbsSnippet
        crumbs={[{ "/thoughts/": "Thoughts" }, { [path]: title }]}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      excerpt
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
