import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"

import MainNavigation from "../main-navigation"
import ThemeSwitcher from "../theme/theme-switcher"
import ReadingTracker, { ContentTypes } from "../analytics/reading-tracker"
import ViewPageHeader from "../theme/view-page-header"

import "./talk.css"
import "../theme/content.css"

const Talk = (props) => {
  const {
    title,
    keywords,
    timeToRead,
    publishedHumanDate,
    publishedFullDate,
    contentHtml,
    cover,
    coverCredits,
  } = props

  return (
    <article className="talk-wrapper">
      <header>
        <ViewPageHeader spaceTitle="Talks" spaceLink="/talks/" />
        <br></br>
        <MainNavigation space={"talks"} />
        <br></br>
        <figure className="cover">
          <div className="cover-filter">
            <GatsbyImage
              className="cover cover-image"
              image={cover}
              alt={title}
              objectFit="fill" 
              objectPosition="center" 
            />
          </div>
          <figcaption
            data-nosnippet=""
            className="image-title"
            dangerouslySetInnerHTML={{ __html: coverCredits }}
          />
        </figure>
        
        <h1>{title}</h1>
        <div data-nosnippet="" className="talk-details">
          <time className="talk-createdat" dateTime={publishedFullDate}>
            {publishedHumanDate}
          </time>
          <span> • </span>
          <span className="talk-time2read">
            {timeToRead}
            {timeToRead > 1 ? "mins" : "min"} read
          </span>
          <div className="theme-switcher">
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <div className="talk-divider" />
      <ul data-nosnippet="" className="talk-tags">
        {keywords.map((keyword) => (
          <li key={`tag-${keyword}`}>{keyword}</li>
        ))}
      </ul>
      <div className="talk-divider" />
      <ReadingTracker contentType={ContentTypes.TALK}>
        <div
          className="content talk-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </ReadingTracker>
    </article>
  )
}

Talk.propTypes = {
  title: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  publishedHumanDate: PropTypes.string.isRequired,
  publishedFullDate: PropTypes.string.isRequired,
  contentHtml: PropTypes.string.isRequired,
}

export default Talk
