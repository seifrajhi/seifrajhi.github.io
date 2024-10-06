import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const NotFoundImage = (): JSX.Element => {
  return (
    <StaticImage
      className="not-found-img"
      src={`../../images/404/not-found-image.png`}
      width={300}
      quality={80}
      formats={["auto", "webp", "avif"]}
      alt={`Not Found Space`}
    />
  )
}

export default NotFoundImage
