import * as React from "react"
import { useEffect, useState } from "react"

import "./table-of-content.css"

type ContentSection = HTMLAnchorElement | HTMLHeadingElement

const TableOfContent = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState("")
  const [contentSections, setContentSections] = useState([])

  const updateNavigation = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.intersectionRatio <= 0) {
        return
      }

      setActiveSection(entry.target.getAttribute("id") || "")
    })
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const observer = new IntersectionObserver(updateNavigation)

    const introSection: HTMLAnchorElement[] = Array.from(
      document.querySelectorAll("#intro")
    )
    const contentSections: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll(".content h2[id]")
    )

    const allSections: ContentSection[] = introSection.concat(contentSections)

    allSections.forEach((section) => {
      observer.observe(section)
    })

    setContentSections(contentSections)
  }, [])

  return (
    <div data-nosnippet="" className="blog-content-nav-wrapper">
      <ul className="blog-content-nav">
        <h2>Content</h2>
        <li className={activeSection === "intro" ? "active" : ""} key="intro">
          <a href={"#intro"}>Intro</a>
        </li>
        {contentSections.map((section: ContentSection) => (
          <li
            className={activeSection === section.id ? "active" : ""}
            key={section.id}
          >
            <a href={`#${section.id}`}>{section.innerText}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TableOfContent
