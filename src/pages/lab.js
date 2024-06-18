import React, { Component } from "react"
import Layout from "../components/theme/layout"
import Seo from "../components/seo/seo"
import LabHeader from "../components/lab/lab-header"
import MainNavigation from "../components/main-navigation"
import ExperimentTeaser from "../components/lab/experiment-teaser"
import Footer from "../components/footer"

import experiments from "../../data/lab/experiments.json"
import "./lab.css"

class LabListPage extends Component {
  render() {
    return (
      <Layout>
        <Seo
          title="Lab"
          pagePath="/lab/"
          className="lab-list-page"
          description="Machine Learning Experiments Live"
          keywords={[
            "artificial intelligent",
            "machine learning",
            "deep networks",
            "neural networks",
            "AI demo",
          ]}
        />
        <div className="lab-wrapper">
          <aside className="lab-sidebar">
            <LabHeader />
            <MainNavigation space={"lab"} />
          </aside>
          <main
            className={`experiment-list experiment-grid ${
              !experiments.length ? "no-experiments" : ""
            }`}
          >
            {!experiments.length && (
              <div className="no-experiments-placeholder">
                Great experiments will be here as soon as my muse comes back to
                me{" "}
                <span role="img" aria-label="magic will happen soon">
                  💫
                </span>{" "}
                <br />
                Come back soon{" "}
                <span aria-label="bye" role="img">
                  👋
                </span>
              </div>
            )}
            {experiments.map((experiment) => (
              <ExperimentTeaser
                key={experiment.id}
                title={experiment.title}
                url={experiment.url}
                description={experiment.description}
                category={experiment.category}
              />
            ))}
          </main>
          <div className="clearfix" />
        </div>
        <Footer />
      </Layout>
    )
  }
}

export default LabListPage
