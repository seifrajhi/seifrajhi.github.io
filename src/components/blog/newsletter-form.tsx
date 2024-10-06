import * as React from "react"

import "./newsletter-form.css"

const NewsletterForm = (): JSX.Element => {
  return (
    <div data-nosnippet="" className="newsletter-form">
      <iframe
        src="https://rajhisaif.substack.com/embed"
        loading="lazy"
        width="100%"
        height="320"
        style={{ border: "10px solid #fff" }}
        frameBorder="0"
        scrolling="no"
        title="Newsletter Form"
      />
    </div>
  )
}

export default NewsletterForm
