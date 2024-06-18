import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

interface PersonMetadata {
  image: string | undefined
  name: string
  alternateName: string
  gender: string
  jobTitle: string
  sameAs: string[]
  worksFor: {
    name: string
    sameAs: string
  }
}

const usePersonMetadata = (): PersonMetadata => {
  const data = useStaticQuery<{
    site: { siteMetadata: { personRichSnippet: PersonMetadata } }
    personImage: { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
  }>(graphql`
    query {
      site {
        siteMetadata {
          personRichSnippet {
            alternateName
            gender
            jobTitle
            name
            sameAs
            worksFor {
              name
              sameAs
            }
          }
        }
      }
      personImage: file(relativePath: { eq: "homepage/saifeddine-rajhi.jpeg" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 300)
        }
      }
    }
  `)

  const metadata: PersonMetadata = data.site.siteMetadata.personRichSnippet
  metadata.image =
    data.personImage.childImageSharp.gatsbyImageData.images.fallback?.src

  return metadata
}

export { PersonMetadata, usePersonMetadata }
