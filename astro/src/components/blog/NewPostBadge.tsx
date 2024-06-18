import * as React from "react"

const isNewPost = (publishDate: Date): boolean => {
    const now = new Date()
  
    const msBetweenDates = Math.abs(publishDate.getTime() - now.getTime())
    const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000)
  
    return daysBetweenDates < 30
}

const NewPostBadge = ({publishDate}): JSX.Element => {
    if (!isNewPost(publishDate)) {
        return <></>  
    }

    return (
        <div
            className={`new-badge`}
            title={`Published less than a month ago`}
        >
            new
        </div>
    )
}

export default NewPostBadge