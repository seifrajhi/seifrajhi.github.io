import * as React from "react";
import { useEffect, useRef } from "react";
import { Themes } from "../theme/theme-switcher";
import "./gh-comments.css"; // Import your CSS file

interface Props {
  theme: Themes;
}

const Comments = ({ theme }: Props) => {
  const commentBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const commentScript: HTMLScriptElement = document.createElement("script");

    commentScript.src = `https://giscus.app/client.js`;
    commentScript.crossOrigin = `anonymous`;
    commentScript.async = true;

    commentScript.setAttribute("data-repo", `seifrajhi/seifrajhi-discussions`);
    commentScript.setAttribute("data-repo-id", `R_kgDOM4m_og`);
    commentScript.setAttribute("data-category", `Q&A`);
    commentScript.setAttribute("data-category-id", `DIC_kwDOM4m_os4Ci4it`);
    commentScript.setAttribute("data-mapping", `url`);
    commentScript.setAttribute("data-strict", `0`);
    commentScript.setAttribute("data-reactions-enabled", `1`);
    commentScript.setAttribute("data-emit-metadata", `0`);
    commentScript.setAttribute("data-input-position", `bottom`);
    commentScript.setAttribute("data-theme", `dark`);
    commentScript.setAttribute("data-lang", `en`);

    if (commentBox.current) {
      commentBox.current.appendChild(commentScript);
    }
  }, [commentBox]);

  return (
    <div className="comment-container">
      <div ref={commentBox} className="comment-box" />
    </div>
  );
};

export default Comments;
