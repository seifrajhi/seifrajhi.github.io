import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import "./thought-teaser.css"

interface Props {
  title: string
  url: string
  timeToRead: number
  publishedHumanDate: string
  publishedFullDate: string
  excerpt: string
  cover: IGatsbyImageData
}

const ThoughtTeaser = (props: Props) => {
  const {
    title,
    url,
    timeToRead,
    publishedHumanDate,
    publishedFullDate,
    excerpt,
    cover,
  } = props

  return (
    <article className="thought-item">
      <h2>
        <Link to={url}>{title}</Link>
      </h2>
      <div className="thought-details">
        <time className="thought-createdat" dateTime={publishedFullDate}>
          {publishedHumanDate}
        </time>
        <span> • </span>
        <span className="thought-time2read">
          {timeToRead}
          {timeToRead > 1 ? "mins" : "min"} read
        </span>
      </div>
      <Link to={url}>
        <div className="cover-filter">
          <GatsbyImage className="cover" image={cover} alt={title} />
        </div>
      </Link>
      <p className="thought-digest">{excerpt}</p>
    </article>
  )
}

ThoughtTeaser.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  publishedFullDate: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
}

export default ThoughtTeaser
