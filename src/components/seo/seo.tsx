import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useWebsiteMetadata } from "../../hooks/website-metadata"

interface Meta {
  name?: string
  property?: string
  content: string
}

interface Props {
  title: string
  description: string | undefined
  keywords: string[] | undefined
  lang: string
  meta: Meta[] | undefined
  isUniqueTitle: boolean
  className: string
  ogType: string | undefined
  imagePath: string | undefined
  pagePath: string
}

const Seo = ({
  description,
  keywords,
  lang,
  meta = [],
  title,
  isUniqueTitle = false,
  className,
  imagePath = undefined,
  pagePath,
  ogType = "website",
}: Props) => {
  const siteMetadata = useWebsiteMetadata()

  let metas: Meta[] = meta || []

  const metaDescription: string = description || siteMetadata.description
  const metaKeywords: string[] = keywords || siteMetadata.keywords

  const titleTemplate: string = isUniqueTitle
    ? `${title}`
    : `${title} by ${siteMetadata.title}`

  const socialCardImageUrl = `${siteMetadata.siteUrl}${
    imagePath || siteMetadata.socialImageUrl
  }`

  metas = metas.concat([
    {
      name: `description`,
      property: `og:description`,
      content: metaDescription,
    },
    {
      name: `keywords`,
      content: metaKeywords,
    },
    {
      name: `author`,
      content: siteMetadata.author,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:type`,
      content: ogType,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `image`,
      property: `og:image`,
      content: `${socialCardImageUrl}`,
    },
    {
      name: `twitter:image`,
      content: `${socialCardImageUrl}`,
    },
  ])

  if (pagePath) {
    metas.push({
      property: `og:url`,
      content: `${siteMetadata.siteUrl}${pagePath}`,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
        class: className,
      }}
      title={title}
      titleTemplate={titleTemplate}
      meta={metas}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
