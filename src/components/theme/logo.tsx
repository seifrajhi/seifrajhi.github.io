import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Logo = (): JSX.Element => {
  // TODO: parametrize and unify this component with Avatar one
  return (
    <StaticImage
      className="logo-img"
      src={`../../images/homepage/saifeddine-rajhi.jpeg`}
      width={150}
      quality={80}
      formats={["auto", "webp", "avif"]}
      alt={`Saifeddine Rajhi`}
    />
  )
}

export default Logo
