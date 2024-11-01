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
        Sharing my tech journey and insights in a <strong>fun</strong> and <strong>engaging</strong> way, making complex topics easy to understand and apply.
      </p>
    </div>
  )
}

export default TalkAuthor
