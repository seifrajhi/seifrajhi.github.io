import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import useReadRepository, {
  getStatusLabel,
  ReadStatuses,
} from "../../hooks/read-repository"

import "./blog-teaser.css"
import { ContentTypes } from "../analytics/reading-tracker"

const isNewArticle = (publishDate: string): boolean => {
  const then = new Date(publishDate)
  const now = new Date()

  const msBetweenDates = Math.abs(then.getTime() - now.getTime())
  const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000)

  return daysBetweenDates < 30
}

const BlogTeaser = (props) => {
  const {
    id,
    title,
    url,
    timeToRead,
    publishedHumanDate,
    publishedFullDate,
    excerpt,
    cover,
    keywords,
  } = props

  const [articleReadRepository, _] = useReadRepository(ContentTypes.BLOG)
  const readingState = articleReadRepository[id]

  const isFinished: boolean =
    readingState && readingState.status == ReadStatuses.FINISHED
  const isNew: boolean = isNewArticle(publishedFullDate)

  return (
    <article className="blog-item">
      <Link className="article-header" to={url}>
        <div className="cover-filter">
          <GatsbyImage className="cover" image={cover} alt={title} />
        </div>
        {isNew ? (
          <div
            className={`new-badge`}
            title={`Published less than a month ago`}
          >
            new
          </div>
        ) : (
          ""
        )}
      </Link>
      <div className="article-details">
        <h2>
          <Link to={url}>{title}</Link>
        </h2>
        <div className="blog-details">
          <time className="blog-created-at" dateTime={publishedFullDate}>
            {publishedHumanDate}
          </time>
          <span> • </span>
          <span className={`blog-time2read`}>
            {timeToRead}
            {timeToRead > 1 ? `mins` : `min`} read
          </span>
          {!isFinished ? (
            <>
              <span> • </span>
              <span className={`unread-badge`}>
                {getStatusLabel(readingState?.status)}
              </span>
            </>
          ) : (
            ""
          )}
        </div>
        <p className="blog-digest">{excerpt}</p>
        <ul className="blog-tags">
          {keywords.map((keyword: string) => (
            <li key={url + keyword}>{keyword}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

BlogTeaser.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  publishedFullDate: PropTypes.string.isRequired,
  publishedHumanDate: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
}

export default BlogTeaser
