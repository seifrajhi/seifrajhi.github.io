import * as React from "react"
import {
    getFinishedPosts,
    getStatusLabel,
    isReadingFinished,
} from "../hooks/readRepository";


const ReadingStatusBadge = ({contentID}): JSX.Element => {
    const readPosts = getFinishedPosts();
    const readingState = readPosts[contentID];

    if (isReadingFinished(readingState)) {
        return <></>
    }

    return (
        <>
            <span> • </span>
            <span className="unread-badge">
            {getStatusLabel(readingState?.status)}
            </span>
        </>
    )
}

export default ReadingStatusBadge