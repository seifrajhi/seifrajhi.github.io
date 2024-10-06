import * as React from "react"
import { useEffect, useState } from "react"

import "./table-of-content.css"

type ContentSection = {
  id: string
  text: string
  level: number
  children: ContentSection[]
}

const TableOfContent = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState("")
  const [contentSections, setContentSections] = useState<ContentSection[]>([])

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

    const headings = Array.from(
      document.querySelectorAll(".content h2[id], .content h3[id], .content h4[id]")
    )

    const buildNestedSections = (headings: Element[]): ContentSection[] => {
      const sections: ContentSection[] = []
      const stack: ContentSection[] = []

      headings.forEach((heading) => {
        const level = parseInt(heading.tagName[1])
        const section: ContentSection = {
          id: heading.id,
          text: heading.innerText,
          level,
          children: []
        }

        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop()
        }

        if (stack.length === 0) {
          sections.push(section)
        } else {
          stack[stack.length - 1].children.push(section)
        }

        stack.push(section)
      })

      return sections
    }

    const allSections = buildNestedSections(headings)

    allSections.forEach((section) => {
      observer.observe(document.getElementById(section.id)!)
    })

    setContentSections(allSections)
  }, [])

  const renderSections = (sections: ContentSection[], parentNumber = "") => {
    return (
      <ul className="toc-list">
        {sections.map((section, index) => {
          const sectionNumber = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`
          return (
            <li key={section.id} className={`toc-item ${activeSection === section.id ? "active" : ""}`}>
              <a href={`#${section.id}`}>{sectionNumber}. {section.text}</a>
              {section.children.length > 0 && renderSections(section.children, sectionNumber)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div data-nosnippet="" className="blog-content-nav-wrapper">
      <ul className="blog-content-nav">
        <h2>Content</h2>
        {renderSections(contentSections)}
      </ul>
    </div>
  )
}

export default TableOfContent
