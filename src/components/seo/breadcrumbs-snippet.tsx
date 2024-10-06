import * as React from "react"
import Helmet from "react-helmet"

import { useWebsiteMetadata } from "../../hooks/website-metadata"

interface Breadcrumb {
  "@type": string
  position: number
  name: string
  item: string
}

type Crumb = Record<string, string>

interface Props {
  crumbs: Crumb[]
}

const BreadcrumbsSnippet = ({ crumbs = [] }: Props): JSX.Element => {
  const { siteUrl } = useWebsiteMetadata()

  const crumbItems: Breadcrumb[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteUrl}/`,
    },
  ]

  crumbs.forEach((crumbItem: Crumb, idx: number) => {
    const [[path, title]] = Object.entries(crumbItem)

    crumbItems.push({
      "@type": "ListItem",
      position: idx + 2, // adjustment for the first home item which is in 1 position
      name: title,
      item: `${siteUrl}${path}`,
    })
  })

  const schemaJSONLD = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbItems,
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaJSONLD)}</script>
    </Helmet>
  )
}

export default BreadcrumbsSnippet
