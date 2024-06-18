import React from "react"
import Logo from "../theme/logo"

import "./view-page-header.css"

// todo: refactor name of the component. This header is placed not only on the view pages but on the listings

const ViewPageHeader = ({ spaceTitle, spaceLink, isListing = false }) => {
  return (
    <div className="view-page-header">
      <div className="view-page-header-wrapper">
        <div className="logo-wrapper">
          <div className="logo">
            <Logo width={150} />
          </div>
          <div className="name">
            <a href={spaceLink} title="back to blog">
              Roman <br /> Glushko
            </a>
          </div>
        </div>
        {isListing && (
          <h1 className="blog-title">
            <a href={spaceLink} title="back to the homepage">
              {spaceTitle}
            </a>
          </h1>
        )}
        {!isListing && (
          <h2 className="blog-title">
            <a href={spaceLink} title="back to the homepage">
              {spaceTitle}
            </a>
          </h2>
        )}
      </div>
    </div>
  )
}

export default ViewPageHeader
