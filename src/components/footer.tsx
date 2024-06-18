import * as React from "react"
import SocialLinks from "./homepage/SocialLinks"

import "./Footer.css"

const Footer = (): JSX.Element => {
  const currentDate: Date = new Date()

  return (
    <footer data-nosnippet="">
      <div className="footer-wrapper">
        <SocialLinks showPatreon={true} iconSize={"2x"} />
        <div className="copyright">
          Saifeddine Rajhi © 1996 - {currentDate.getFullYear()} <br />
          <a
            rel="license"
            href="https://creativecommons.org/licenses/by/4.0/"
            title="Content is published under CC BY 4.0 license"
          >
            CC BY 4.0
          </a>
        </div>
        <div className={`pgp`}>
          <a href={`https://keybase.io/saifrajhi`}>AB49 B91C C3E5 8E73</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
