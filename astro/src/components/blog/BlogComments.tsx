import * as React from "react"
import { useEffect, useRef } from "react"
import { useStore } from "@nanostores/react"

import { Themes } from "@components/ThemeSwitcher"
import { themeStore } from "src/stores/theme"

import "./BlogComments.css";

// https://www.vincentntang.com/installing-gatsbyjs-blog-comments/
const Comments = () => {
  const commentBox = useRef(null)
  const $theme = useStore(themeStore)

  useEffect(() => {
    const commentScript: HTMLScriptElement = document.createElement("script")
    
    commentScript.crossOrigin = `anonymous`
    commentScript.async = true
    
    commentScript.src = `https://giscus.app/client.js`

    commentScript.setAttribute("data-repo", `seifrajhi/romaglushkocom-discussions`)
    commentScript.setAttribute("data-repo-id", `MDEwOlJlcG9zaXRvcnkzNTQ5MDgzMzA=`)
    commentScript.setAttribute("data-category", `General`)
    commentScript.setAttribute("data-category-id", `DIC_kwDOFSd4qs4CYfEY`)
    commentScript.setAttribute("data-mapping", `title`)
    commentScript.setAttribute("data-strict", `1`)
    commentScript.setAttribute("data-reactions-enabled", `1`)
    commentScript.setAttribute("data-emit-metadata", `0`)
    commentScript.setAttribute("data-input-position", `top`)
    commentScript.setAttribute("data-theme", themeStore.get() == Themes.LIGHT ? `light` : `dark_dimmed`)
    commentScript.setAttribute("data-lang", `en`)
    commentScript.setAttribute("data-loading", `lazy`)

    commentBox.current.innerHTML = ""
    commentBox.current.appendChild(commentScript)
  }, [$theme])

  return <div ref={commentBox} className="comment-box" />
}

export default Comments
