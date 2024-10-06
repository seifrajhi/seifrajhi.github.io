import * as React from "react"
import Logo from "../theme/logo"

import "./thought-author.css"

const ThoughtAuthor = (): JSX.Element => {
  return (
    <div className="thought-author-wrapper">
      <div className="logo">
        <div className="avatar">
          <Logo />
        </div>
      </div>
      <div className="name">• Saifeddine Rajhi •</div>
      <p className="thought-section-descr">
        My thoughts, pieces of advice and personal & professional life experience <br />
        that will help you to <strong>overcome</strong> your life struggles
      </p>
    </div>
  )
}

export default ThoughtAuthor
