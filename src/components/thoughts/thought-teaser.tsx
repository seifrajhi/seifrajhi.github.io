import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import useReadRepository, {
  getStatusLabel,
  ReadStatuses,
} from "../../hooks/read-repository"

import "./thought-teaser.css"
import { ContentTypes } from "../analytics/reading-tracker"

const isNewArticle = (publishDate: string): boolean => {
  const then = new Date(publishDate)
  const now = new Date()

  const msBetweenDates = Math.abs(then.getTime() - now.getTime())
  const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000)

  return daysBetweenDates < 30
}


  const ThoughtTeaser = (props) => {
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




  const [articleReadRepository, _] = useReadRepository(ContentTypes.THOUGHT)
  const readingState = articleReadRepository[id]

  const isFinished: boolean =
    readingState && readingState.status == ReadStatuses.FINISHED
  const isNew: boolean = isNewArticle(publishedFullDate)

  return (
    <article className="thought-item">
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
        <div className="thought-details">
          <time className="thought-createdat" dateTime={publishedFullDate}>
            {publishedHumanDate}
          </time>
          <span> • </span>
          <span className="thought-time2read">
            {timeToRead}
            {timeToRead > 1 ? "mins" : "min"} read
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
        <p className="thought-digest">{excerpt}</p>
        <ul className="thought-tags">
          {keywords.map((keyword: string) => (
            <li key={url + keyword}>{keyword}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

ThoughtTeaser.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  publishedFullDate: PropTypes.string.isRequired,
  publishedHumanDate: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
  keywords: PropTypes.array.isRequired,
}

export default ThoughtTeaser
