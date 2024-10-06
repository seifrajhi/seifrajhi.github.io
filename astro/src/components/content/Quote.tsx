import * as React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone"

import "./Quote.css"

interface Props {
    showIcon?: boolean;
    children: any;
}

const Quote = ({showIcon = true, children}: Props) => {
    return <blockquote className={`quote`}>
        {showIcon && <div className={`quote-icon`}>
            <FontAwesomeIcon icon={faMicrophone} />
        </div>}
        <div className="body">{children}</div>
    </blockquote>
}


export default Quote