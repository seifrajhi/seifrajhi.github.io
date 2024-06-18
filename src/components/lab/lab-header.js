import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import NNBackground from "../nn-design/nn-background.js"

import "./lab-header.css"

const LabHeader = () => {
  return (
    <div id="hero-header" className="lab-header">
      <ThemeToggler>
        {({ theme }) => <NNBackground theme={theme} />}
      </ThemeToggler>
      <h1 className="title">
        <span className="highlight">Lab</span> <br />
        Machine Learning Experiments <br />
        <span className="subscript">
          Live <div className="live-circle pulse" />
        </span>
      </h1>
    </div>
  )
}

export default LabHeader
