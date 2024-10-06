import * as React from "react"

import Layout from "../components/theme/layout"
import Seo from "../components/seo/seo"
import MainNavigation from "../components/main-navigation"
import BreadcrumbsSnippet from "../components/seo/breadcrumbs-snippet"
import ThemeSwitcher from "../components/theme/theme-switcher"

import "../components/404/404.css"
import Pokemon from "../components/404/pokemon"

const NotFoundPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="404: Not Found"
      className="not-found-page"
      meta={[
        {
          name: `robots`,
          content: `noindex,nofollow`,
        },
      ]}
    />
    <div className="container">
      <main className="row not-found-wrapper">
        <div className="not-found-content">
          <Pokemon>
            <h1>Not Found</h1>
            <MainNavigation space="404" />
            <p>
              You just hit a route that <strong>doesn&#39;t exist</strong>.
            </p>
            <p className={`pokemon-intro`}>
              At least you have found a pokemon:
            </p>
          </Pokemon>
          <ThemeSwitcher />
        </div>
      </main>
      <BreadcrumbsSnippet crumbs={[]} />
    </div>
  </Layout>
)

export default NotFoundPage
