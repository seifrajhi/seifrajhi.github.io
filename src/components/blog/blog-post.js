import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"

import ThemeSwitcher from "../theme/theme-switcher"
import TableOfContent from "./table-of-content"
import ReadingTracker, { ContentTypes } from "../analytics/reading-tracker"

import "./blog-post.css"
import "../theme/content.css"
import "./code-theme.css"

const BlogPost = (props) => {
  const {
    id,
    title,
    timeToRead,
    publishedHumanDate,
    publishedFullDate,
    keywords,
    contentHtml,
    cover,
    coverCredits,
  } = props

  return (
    <article className="blog-wrapper">
      <header>
        <figure className="cover">
          <div className="cover-filter">
            <GatsbyImage
              className="cover cover-image"
              image={cover}
              alt={title}
            />
          </div>
          <figcaption
            data-nosnippet=""
            className="image-title"
            dangerouslySetInnerHTML={{ __html: coverCredits }}
          />
        </figure>
        <h1>{title}</h1>
        <div data-nosnippet="" className="blog-details">
          <time className="blog-createdat" dateTime={publishedFullDate}>
            {publishedHumanDate}
          </time>
          <span> • </span>
          <span className="blog-time2read">
            {timeToRead}
            {timeToRead > 1 ? "mins" : "min"} read
          </span>
          <div className="theme-switcher">
            <ThemeSwitcher />
          </div>
        </div>
        <ul data-nosnippet="" className="blog-tags">
          {keywords.map((keyword) => (
            <li key={`tag-${keyword}`}>{keyword}</li>
          ))}
        </ul>
      </header>
      <div className="blog-divider" />
      <ReadingTracker id={id} contentType={ContentTypes.BLOG}>
        <div className="content-wrapper">
          <TableOfContent />
          <div
            className="content blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </ReadingTracker>
    </article>
  )
}

BlogPost.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  publishedHumanDate: PropTypes.string.isRequired,
  publishedFulDate: PropTypes.string.isRequired,
  keywords: PropTypes.array.isRequired,
  contentHtml: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
}

export default BlogPost
