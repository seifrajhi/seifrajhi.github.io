import * as React from "react"
import { Link } from "gatsby"

import "./main-navigation.css"

export type Spaces = "homepage" | "blog" | "thoughts"| "cv" | "404"

interface Props {
  space: Spaces
}

const MainNavigation = ({ space }: Props): JSX.Element => {
  return (
    <nav className="main-navigation">
      <ul>
        {space !== "homepage" && (
          <li>
            <Link rel="home" to="/" title="Go Home">
              Home
            </Link>
          </li>
        )}
        <li>
          <Link to="/blog/" title="Go to my Technical Blog">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/thoughts/" title="Go to my Thoughts">
            Thoughts
          </Link>
        </li>
        <li>
          <Link to="/cv/platform-engineer/" title="Review My Resume">
            cv
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default MainNavigation
