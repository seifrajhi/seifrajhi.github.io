import * as React from "react"
import { useEffect, useRef } from "react"
import { Themes } from "../theme/theme-switcher"

interface Props {
  theme: Themes
}

// https://www.vincentntang.com/installing-gatsbyjs-blog-comments/
const Comments = ({ theme }: Props) => {
  const commentBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const commentScript: HTMLScriptElement = document.createElement("script")

    commentScript.src = `https://utteranc.es/client.js`
    commentScript.crossOrigin = `anonymous`
    commentScript.async = true

    commentScript.setAttribute("label", `discussion💬`)
    commentScript.setAttribute(
      "repo",
      `seifrajhi/seifrajhi-discussions`
    )
    commentScript.setAttribute("issue-term", `pathname`)
    commentScript.setAttribute("theme", `github-light`)

    commentScript.setAttribute("data-nosnippet", ``)

    if (commentBox.current) {
      commentBox.current.appendChild(commentScript)
    }
  }, [commentBox])

  return <div ref={commentBox} className="comment-box" />
}

export default Comments
