import * as React from "react"
import PropTypes from "prop-types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit"
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn"
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook"
import { faGetPocket } from "@fortawesome/free-brands-svg-icons/faGetPocket"

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  PocketShareButton,
} from "react-share"

// import { trackCustomEvent } from "gatsby-plugin-google-analytics"

import siteMetadata from "@data/siteMetadata"

import "./ShareBlock.css"

interface Props {
  title: string
  path: string
  keywords: string[]
}

const ShareBlock = ({ title, path, keywords }: Props): JSX.Element => {
  const { siteUrl } = siteMetadata
  const url: string = `${siteUrl}${path}`

  return (
    <div data-nosnippet="" className="social-share-wrapper">
      <FacebookShareButton
        beforeOnClick={() => {
        //   trackCustomEvent({
        //     category: "social",
        //     action: "share",
        //     label: "facebook",
        //   })

          typeof window !== "undefined" &&
            typeof window.gtag !== "undefined" &&
            window.gtag("event", "share", {
              event_category: "social",
              event_label: "facebook",
            })
        }}
        url={url}
        keywords={keywords}
        className="social-share-item facebook"
        aria-label="Share Via Facebook"
        title="Share Via Facebook"
      >
        <FontAwesomeIcon icon={faFacebook} />
      </FacebookShareButton>
      <TwitterShareButton
        beforeOnClick={() => {
        //   trackCustomEvent({
        //     category: "social",
        //     action: "share",
        //     label: "twitter",
        //   })

          typeof window !== "undefined" &&
            typeof window.gtag !== "undefined" &&
            window.gtag("event", "share", {
              event_category: "social",
              event_label: "twitter",
            })
        }}
        url={url}
        className="social-share-item twitter"
        title={title}
        keywords={keywords}
        aria-label="Share Via Twitter"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </TwitterShareButton>
      <LinkedinShareButton
        beforeOnClick={() => {
        //   trackCustomEvent({
        //     category: "social",
        //     action: "share",
        //     label: "linkedin",
        //   })
          typeof window !== "undefined" &&
            typeof window.gtag !== "undefined" &&
            window.gtag("event", "share", {
              event_category: "social",
              event_label: "linkedin",
            })
        }}
        url={url}
        className="social-share-item linkedin"
        aria-label="Share Via LinkedIn"
        keywords={keywords}
        title="Share Via LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </LinkedinShareButton>
      <RedditShareButton
        beforeOnClick={() => {
        //   trackCustomEvent({
        //     category: "social",
        //     action: "share",
        //     label: "reddit",
        //   })
          typeof window !== "undefined" &&
            typeof window.gtag !== "undefined" &&
            window.gtag("event", "share", {
              event_category: "social",
              event_label: "reddit",
            })
        }}
        url={url}
        className="social-share-item reddit"
        title={title}
        keywords={keywords}
        aria-label="Share Via Reddit"
      >
        <FontAwesomeIcon icon={faReddit} />
      </RedditShareButton>
      <PocketShareButton
        beforeOnClick={() => {
        //   trackCustomEvent({
        //     category: "social",
        //     action: "share",
        //     label: "pocket",
        //     value: url,
        //   })

          typeof window !== "undefined" &&
            typeof window.gtag !== "undefined" &&
            window.gtag("event", "share", {
              event_category: "social",
              event_label: "pocket",
              value: url,
            })
        }}
        url={url}
        className="social-share-item pocket"
        title={title}
        keywords={keywords}
        aria-label="Add to Pocket"
      >
        <FontAwesomeIcon icon={faGetPocket} />
      </PocketShareButton>
    </div>
  )
}

ShareBlock.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
}

ShareBlock.defaultProps = {
  keywords: [],
}

export default ShareBlock
