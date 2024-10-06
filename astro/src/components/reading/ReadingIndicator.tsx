import * as React from "react"
import { useEffect } from "react"

import "./ReadingIndicator.css"

const ReadingIndicator = () => {
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;  
            const scrolled = (winScroll / height) * 100;
            
            const indicator: HTMLElement = document.querySelector(".reading-indicator") as HTMLElement

            indicator.style.width = scrolled + "%";
        });
    }, [])

    return <div className="reading-indicator" />
}

export default ReadingIndicator;