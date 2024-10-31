import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./talk-navigation.css"

const TalkNavigation = (props) => {
  const {
    next: { frontmatter: { title: nextTitle, path: nextUrl } = {} } = {},
    prev: { frontmatter: { title: prevTitle, path: prevUrl } = {} } = {},
  } = props

  return (
    <div className="talk-navigation-wrapper">
      <nav className="talk-navigation">
        <div className="nav-links">
          {nextUrl && (
            <Link rel="next" className="next-talk" to={nextUrl}>
              {nextTitle} →
            </Link>
          )}
          {prevUrl && (
            <Link rel="prev" className="prev-talk" to={prevUrl}>
              ← {prevTitle}
            </Link>
          )}
          <Link className="all-talks" to="/talks/">
            All talks
          </Link>
        </div>
      </nav>
    </div>
  )
}

TalkNavigation.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
}

export default TalkNavigation
