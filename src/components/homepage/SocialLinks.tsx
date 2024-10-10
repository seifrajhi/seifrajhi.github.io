import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { faXTwitter} from "@fortawesome/free-brands-svg-icons/faXTwitter"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons/faRedditAlien"
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons/faStackOverflow"
import { faGoodreads } from  "@fortawesome/free-brands-svg-icons/faGoodreads"
import { faOsi } from "@fortawesome/free-brands-svg-icons/faOsi"
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine"
import { faRss } from "@fortawesome/free-solid-svg-icons/faRss"
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

const SocialLinks = ({
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
            <FontAwesomeIcon icon={faLinkedinIn} beat size={iconSize} />
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
            <FontAwesomeIcon icon={faGithub} beat size={iconSize} />
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
            <FontAwesomeIcon icon={faEnvelope} beat size={iconSize} />
            <span>Email</span>
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
            title="Saifeddine Rajhi on X/X/Twitter"
            target="blank"
          >
            <FontAwesomeIcon icon={faXTwitter} beat size={iconSize} />
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
            <FontAwesomeIcon icon={faRedditAlien} beat size={iconSize} />
            <span>Reddit</span>
          </OutboundLink>
        </li>
        <li className="social-item social-stackoverflow">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="StackOverflow"
            href="https://stackoverflow.com/users/21897244/saifeddine-rajhi"
            title="Saifeddine Rajhi on StackOverflow"
            target="blank"
          >
            <FontAwesomeIcon icon={faStackOverflow} beat size={iconSize} />
            <span>StackOverflow</span>
          </OutboundLink>
        </li>

        <li className="social-item social-Goodreads">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="StackOverflow"
            href="https://www.goodreads.com/user/show/176103378-saifeddine"
            title="Saifeddine Rajhi on Goodreads"
            target="blank"
          >
            <FontAwesomeIcon icon={faGoodreads} beat size={iconSize}  />
            <span>Goodreads</span>
          </OutboundLink>
        </li>
        <li className="social-item social-osi">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="StackOverflow"
            href="https://ossinsight.io/analyze/seifrajhi"
            title="Saifeddine Rajhi on OSSInsights"
            target="blank"
          >
            <FontAwesomeIcon icon={faOsi} beat size={iconSize}  />
            <span>OSSInsights</span>
          </OutboundLink>
        </li>
        <li className="social-item social-devstats">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="StackOverflow"
            href="https://devstats.cluster.fun/?user=seifrajhi"
            title="Saifeddine Rajhi on DevStats"
            target="blank"
          >
            <FontAwesomeIcon icon={faChartLine} beat size={iconSize}  />
            <span>DevStats</span>
          </OutboundLink>
        </li>   
        <li className="social-item social-RSS">
          <OutboundLink
            rel="me"
            itemProp="url"
            eventCategory="social"
            eventAction="click"
            eventLabel="RSS"
            href="https://seifrajhi.github.io/rss.xml"
            title="Subscribe to my blog post"
            target="blank"
          >
            <FontAwesomeIcon icon={faRss} beat size={iconSize}  />
            <span>RSS</span>
          </OutboundLink>
        </li>   
      </ul>
    </div>
  )
}

export default SocialLinks
