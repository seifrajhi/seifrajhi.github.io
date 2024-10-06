import { graphql, useStaticQuery } from "gatsby"

interface WebsiteMetadata {
  siteUrl: string
  title: string
  description: string
  author: string
  keywords: string[]
  socialImageUrl: string
}

const useWebsiteMetadata = (): WebsiteMetadata => {
  const metadata = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
            keywords
          }
        }
        socialImage: file(
          relativePath: { eq: "blog/seifrajhi-in-kcd-utrecht-process.jpg" }
        ) {
          publicURL
        }
      }
    `
  )

  return {
    ...metadata.site.siteMetadata,
    socialImageUrl: metadata.socialImage.publicURL,
  }
}

export { useWebsiteMetadata }
