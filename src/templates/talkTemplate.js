import React from "react"
import { graphql, Link } from "gatsby"
import TalkAuthor from "../components/talks/talk-author"
import Talk from "../components/talks/talk"
import TalkNavigation from "../components/talks/talk-navigation"
import Layout from "../components/theme/layout"
import Footer from "../components/footer"
import Seo from "../components/seo/seo"
import MainNavigation from "../components/main-navigation"
import ViewPageHeader from "../components/theme/view-page-header"
import NewsletterForm from "../components/blog/newsletter-form"
import ShareBlock from "../components/talks/share-block"
import BreadcrumbsSnippet from "../components/seo/breadcrumbs-snippet"
import ArticleRichSnippet from "../components/seo/article-snippet"

import "./TalkView.css"

export default function Template({
  data,
  pageContext: { prevTalk, nextTalk },
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
        title={`${title} - Talks`}
        className="talk-view-page"
        pagePath={path}
        imagePath={gatsbyImageData.images.fallback.src}
        ogType="article"
        description={excerpt}
        keywords={keywords}
        meta={[]}
      />
      <div className="talk-header">
      </div>
      <main>
        <Talk
          title={title}
          timeToRead={timeToRead}
          publishedHumanDate={humanDate}
          publishedFullDate={fullDate}
          keywords={keywords}
          cover={gatsbyImageData}
          coverCredits={coverCredits}
          contentHtml={html}
        />
        <ShareBlock title={title} path={path} tags={keywords} className="spaced-component" />
        <NewsletterForm />
      </main>
      <aside className="talk-sidebar">
        <TalkAuthor />
        <TalkNavigation prev={prevTalk} next={nextTalk} />
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
        articleSection={"Talks"}
        genre={[
          "self-improvement",
          "management",
          "talks",
          "life experience",
          "life exploration",
        ]}
      />
      <BreadcrumbsSnippet
        crumbs={[{ "/talks/": "Talks" }, { [path]: title }]}
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
