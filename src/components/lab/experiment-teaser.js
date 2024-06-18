import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFlask } from "@fortawesome/free-solid-svg-icons/faFlask"

import "./experiment-teaser.css"

const ExperimentTeaser = (props) => {
  const { title, url, description, category, publishDate } = props

  return (
    <article className="experiment-item">
      <Link to={url}>
        <div className="experiment-preview">
          <FontAwesomeIcon icon={faFlask} size="7x" />
        </div>
      </Link>
      <h2>
        <Link to={url}>{title}</Link>
      </h2>
      <div className="blog-details">
        <span className="experiment-category">{category}</span>
        <span> • </span>
        <time className="experiment-published-at" dateTime={publishDate}>
          {publishDate}
        </time>
      </div>
      <p className="blog-digest">{description}</p>
    </article>
  )
}

ExperimentTeaser.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
}

export default ExperimentTeaser
