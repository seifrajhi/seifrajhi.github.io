import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const ArticleSnippet = ({
  genre,
  articleSection,
  title,
  path,
  datePublished,
  dateModified,
  cover,
  content,
  wordCount,
  keywords,
}) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  const schemaJSONLD = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    image: cover.images.fallback.src,
    headline: title,
    dateCreated: datePublished,
    datePublished,
    dateModified: dateModified,
    inLanguage: "en-US",
    isFamilyFriendly: true,
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: "Saifeddine Rajhi",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Saifeddine Rajhi's Website",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${path}`,
    },
    keywords: keywords,
    genre,
    articleSection,
    articleBody: content,
    wordcount: wordCount,
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaJSONLD)}</script>
    </Helmet>
  )
}

export default ArticleSnippet
