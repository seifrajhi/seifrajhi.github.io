import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./blog-navigation.css"

const BlogNavigation = (props) => {
  const {
    next: { frontmatter: { title: nextTitle, path: nextUrl } = {} } = {},
    prev: { frontmatter: { title: prevTitle, path: prevUrl } = {} } = {},
  } = props

  return (
    <div data-nosnippet="" className="blog-navigation-wrapper">
      <h3>Read Other Posts</h3>
      <nav className="blog-navigation">
        <div className="nav-links">
          {nextUrl && (
            <Link rel="next" className="next-post" to={nextUrl}>
              {nextTitle} →
            </Link>
          )}
          {prevUrl && (
            <Link rel="prev" className="prev-post" to={prevUrl}>
              ← {prevTitle}
            </Link>
          )}
          <Link className="all-posts" to="/blog/">
            All Posts
          </Link>
        </div>
      </nav>
    </div>
  )
}

BlogNavigation.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
}

export default BlogNavigation
