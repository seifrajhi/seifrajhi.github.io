import * as React from "react"
import Logo from "../theme/logo"

import "./cv-header.css"

type Props = {
  position: string
}

const CvHeader = ({ position }: Props): JSX.Element => {
  return (
    <div className="cv-header-wrapper">
      <div className="logo">
        <div itemProp="image" className="avatar">
          <Logo width={150} />
        </div>
      </div>
      <hgroup>
        <h2 itemProp="name" className="cv-name">
          Roman <strong>Glushko</strong>
        </h2>
        <h1 itemProp="jobTitle" className="cv-position">
          {position}
        </h1>
      </hgroup>
    </div>
  )
}

export default CvHeader
