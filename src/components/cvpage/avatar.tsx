import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Avatar = (): JSX.Element => {
  const {
    placeholderImage: {
      childImageSharp: { gatsbyImageData },
    },
  } = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "homepage/saifeddine-rajhi.jpeg" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 300)
        }
      }
    }
  `)

  return (
    <GatsbyImage
      className="logo-img"
      image={gatsbyImageData}
      alt={`Saifeddine Rajhi - Platform engineer and Software Engineer, Life Explorer`}
    />
  )
}

export default Avatar
