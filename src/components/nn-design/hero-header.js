import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import NNBackground from "./nn-background.js"

import "./hero-header.css"

const HeroHeader = () => {
  return (
    <div id="hero-header" className="hero-header">
      <ThemeToggler>
        {({ theme }) => <NNBackground theme={theme} />}
      </ThemeToggler>
      <h1 className="title">
        <span className="highlight">Learn</span> <br /> Neural Network Design{" "}
        <br /> <span className="subscript">by examples</span>
      </h1>
    </div>
  )
}

export default HeroHeader
