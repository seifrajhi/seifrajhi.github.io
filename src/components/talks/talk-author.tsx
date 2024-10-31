import * as React from "react"
import Logo from "../theme/logo"

import "./talk-author.css"

const TalkAuthor = (): JSX.Element => {
  return (
    <div className="talk-author-wrapper">
      <div className="logo">
        <div className="avatar">
          <Logo />
        </div>
      </div>
      <br></br>
      <div className="name">• Saifeddine Rajhi •</div>
      <p className="talk-section-descr">
        My talks, pieces of advice and personal & professional life experience <br />
        that will help you to <strong>overcome</strong> your life struggles
      </p>
    </div>
  )
}

export default TalkAuthor
