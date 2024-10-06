import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./thought-navigation.css"

const ThoughtNavigation = (props) => {
  const {
    next: { frontmatter: { title: nextTitle, path: nextUrl } = {} } = {},
    prev: { frontmatter: { title: prevTitle, path: prevUrl } = {} } = {},
  } = props

  return (
    <div className="thought-navigation-wrapper">
      <nav className="thought-navigation">
        <div className="nav-links">
          {nextUrl && (
            <Link rel="next" className="next-thought" to={nextUrl}>
              {nextTitle} →
            </Link>
          )}
          {prevUrl && (
            <Link rel="prev" className="prev-thought" to={prevUrl}>
              ← {prevTitle}
            </Link>
          )}
          <Link className="all-thoughts" to="/thoughts/">
            All Thoughts
          </Link>
        </div>
      </nav>
    </div>
  )
}

ThoughtNavigation.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
}

export default ThoughtNavigation
