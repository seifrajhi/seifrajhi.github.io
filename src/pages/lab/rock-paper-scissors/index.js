import React from "react"
import { graphql } from "gatsby"

import { ThemeToggler } from "gatsby-plugin-dark-mode"

import Layout from "../../../components/theme/layout"
import Seo from "../../../components/seo/seo"
import ViewPageHeader from "../../../components/theme/view-page-header"
import MainNavigation from "../../../components/main-navigation"
import NNBackground from "../../../components/nn-design/nn-background.js"
import Footer from "../../../components/footer"

import RockPaperScissorGame from "../../../components/lab/rock-paper-scissor-game.js"

import "./index.css"
import ReadingTracker, {
  ContentTypes,
} from "../../../components/analytics/reading-tracker"

const RockPaperScissorPage = ({ data }) => {
  const {
    markdownRemark: { html },
  } = data

  return (
    <Layout>
      <Seo
        title={"Rock, Paper, Scissors Game - Lab by Saifeddine Rajhi"}
        className="experiment-view-page"
        pagePath="/lab/rock-paper-scissors/"
        ogType="article"
        description="Rock, paper, scissors online game powered by Machine Learning"
        keywords="rock, paper, scissors, online game, machine learning, deep learning, computer vision"
      />
      <header className="experiment-header">
        <ViewPageHeader spaceTitle="Lab" spaceLink="/lab/" />
        <MainNavigation space={"lab"} />
      </header>
      {/** refactor NN background component */}
      <div id="hero-header" className="lab-header">
        <ThemeToggler>
          {({ theme }) => <NNBackground theme={theme} />}
        </ThemeToggler>
        <h1 className="title">
          Rock, Paper, Scissors
          <br />
          <span className="experiment-category">computer vision</span>
        </h1>
      </div>
      <main className="rockpaperscissor-wrapper">
        <ReadingTracker contentType={ContentTypes.LAB}>
          <div className="into content">
            <p>
              <strong>Rock, paper, scissors</strong> is a legendary hand game
              that many of us played with friends in childhood.
            </p>
            <p>
              Rules are simple. You and your opponent choose one of three shapes
              (
              <span aria-label="rock figure" role="img">
                ✊
              </span>
              ,{" "}
              <span aria-label="paper figure" role="img">
                ✋
              </span>
              ,{" "}
              <span aria-label="scissors figure" role="img">
                ✌️
              </span>
              ), which you both form simultaneously. Your goal is to guess a
              shape that beats your opponent's choice:
            </p>
            <ul>
              <li>
                Rock beats Scissors (
                <span aria-label="rock figure" role="img">
                  ✊
                </span>{" "}
                →{" "}
                <span aria-label="beats scissors figure" role="img">
                  ✌️
                </span>
                )
              </li>
              <li>
                Paper covers Rock (
                <span aria-label="paper figure" role="img">
                  ✋
                </span>{" "}
                →{" "}
                <span aria-label="beats rock figure" role="img">
                  ✊
                </span>
                )
              </li>
              <li>
                Scissors cuts Paper (
                <span aria-label="scissors figure" role="img">
                  ✌️
                </span>{" "}
                →{" "}
                <span aria-label="beats paper figure" role="img">
                  ✋
                </span>
                )
              </li>
            </ul>
            <p>
              Now you have a chance to try to play rock, paper, scissors in an
              AI-powered game online.
            </p>
            <h2>How Does it Work?</h2>
            <p>
              The game requests your web camera access and loads a computer
              vision model directly into your browser (the game is completely
              serverless).
            </p>
            <p>
              When you press the play button, you have 3 seconds to form one of
              three choices and to show it on camera. The model will try to
              predict what form you showed and compare it with another choice
              which computer simultaneously made with you. The game compares
              both choices and updates your scores.
            </p>
            <p>Try to play until you win!</p>
          </div>
          <h2>Try it Yourself</h2>
          <RockPaperScissorGame />
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </ReadingTracker>
      </main>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query GetRPSDescription {
    markdownRemark(
      fileAbsolutePath: { regex: "/lab/rock-paper-scissors/description.md/" }
    ) {
      html
    }
  }
`

export default RockPaperScissorPage
