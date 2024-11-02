import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { faXTwitter} from "@fortawesome/free-brands-svg-icons/faXTwitter"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons/faRedditAlien"
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky"
import "./SocialLinks.css"

export type IconSize =
  | "xs"
  | "lg"
  | "sm"
  | "1x"
  | "2x"
  | "3x"
  | "4x"
  | "5x"
  | "6x"
  | "7x"
  | "8x"
  | "9x"
  | "10x"

type Props = {
  iconSize: IconSize
  showPatreon: boolean
}

const CvPage = ({
  iconSize = "sm",
  showPatreon = true,
}: Props): JSX.Element => {
  return (
    <div data-nosnippet="" className="social">
      <ul className="social-list">
        <li className="social-item social-linkedin">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="linkedin"
            href="https://www.linkedin.com/in/rajhi-saif/"
            title="Saifeddine Rajhi on LinkedIn"
            target="blank"
          >
            <FontAwesomeIcon icon={faLinkedinIn}  size={iconSize} />
            <span>LinkedIn</span>
          </OutboundLink>
        </li>
        <li className="social-item social-github">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="github"
            href="https://github.com/seifrajhi"
            title="Saifeddine Rajhi on Github"
            target="blank"
          >
            <FontAwesomeIcon icon={faGithub}  size={iconSize} />
            <span>GitHub</span>
          </OutboundLink>
        </li>
        <li className="social-item social-email">
          <OutboundLink
            itemProp="email"
            eventCategory="social"
            eventAction="click"
            eventLabel="email"
            href="mailto:rajhiseif@gmail.com"
            title="Saifeddine Rajhi's Email"
          >
            <FontAwesomeIcon icon={faEnvelope}  size={iconSize} />
            <span>Email</span>
          </OutboundLink>
        </li>
        <li className="social-item social-bluesky">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="bluesky"
            eventAction="click"
            eventLabel="social"
            href="https://bsky.app/profile/saifrajhi.bsky.social"
            title="Saifeddine Rajhi on Bluesky Social"
            target="blank"
          >
            <FontAwesomeIcon icon={faBluesky}  size={iconSize} />
            <span>Bluesky Social</span>
          </OutboundLink>
        </li>
        <li className="social-item social-X/Twitter">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="X/Twitter"
            href="https://x.com/RajhiSaifeddine"
            title="Saifeddine Rajhi on X/Twitter"
            target="blank"
          >
            <FontAwesomeIcon icon={faXTwitter}  size={iconSize} />
            <span>X/Twitter</span>
          </OutboundLink>
        </li>
        <li className="social-item social-reddit">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="reddit"
            href="https://www.reddit.com/user/ScoreApprehensive992/"
            title="Saifeddine Rajhi on Reddit"
            target="blank"
          >
            <FontAwesomeIcon icon={faRedditAlien}  size={iconSize} />
            <span>Reddit</span>
          </OutboundLink>
        </li>
   
      </ul>
    </div>
  )
}

export default CvPage
