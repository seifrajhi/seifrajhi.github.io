import * as React from "react"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { ReactNode, useEffect, useState } from "react"
import useReadRepository, {
  ReadState,
  ReadStatuses,
} from "../../hooks/read-repository"

export enum ContentTypes {
  BLOG = "blog",
  THOUGHT = "thought",
  LAB = "lab",
}

interface Props {
  id: string
  contentType: ContentTypes
  children: ReactNode
}

const ReadingTracker = (props: Props): JSX.Element => {
  const [contentType] = useState<string>(props.contentType)
  const [initializedAt] = useState<number>(new Date().getTime())
  const [readingStarted, setReadingStarted] = useState<boolean>(false)
  const [readingStartedAt, setReadingStartedAt] = useState<number>(0)
  const [readingEnded, setReadingEnded] = useState<boolean>(false)
  const [readingEndedAt, setReadingEndedAt] = useState<number>(0)

  const [readRepository, saveReadRepository] = useReadRepository(
    props.contentType
  )

  const trackReadingStart = (
    intersectedSections: IntersectionObserverEntry[]
  ) => {
    const section: IntersectionObserverEntry = intersectedSections[0]

    if (!section.isIntersecting || section.intersectionRatio <= 0) {
      return
    }

    if (readingStarted) {
      // already tracked start of reading
      return
    }

    const startedAt: number = new Date().getTime()
    const secondsUntilStartedReading: number = Math.round(
      (startedAt - initializedAt) / 1000
    )

    window.requestAnimationFrame(() => {
      trackCustomEvent({
        category: "content",
        action: "startReading",
        label: contentType,
        value: secondsUntilStartedReading,
      })

      typeof window !== "undefined" &&
        typeof window.gtag !== "undefined" &&
        window.gtag("event", "startReading", {
          event_category: "content",
          event_label: contentType,
          value: secondsUntilStartedReading,
        })
    })

    setReadingStarted(true)
    setReadingStartedAt(startedAt)

    // mark content as in progress of reading

    const readState: ReadState = readRepository[props.id] || {
      status: ReadStatuses.READING,
      changed_at: new Date(),
    }

    if (readState.status == ReadStatuses.FINISHED) {
      // content was read fully once. Don't reset that status
      return
    }

    readState.status = ReadStatuses.READING
    readState.changed_at = new Date()

    readRepository[props.id] = readState
    saveReadRepository(readRepository)
  }

  const trackReading = (sections: IntersectionObserverEntry[]): void => {
    if (!readingStarted) {
      return
    }

    if (readingEnded) {
      return
    }

    const currentReadingSections: string[] = []

    sections.forEach((section) => {
      if (!section.isIntersecting || section.intersectionRatio <= 0) {
        return
      }

      currentReadingSections.push(section.target.getAttribute("id") as string)
    })

    if (currentReadingSections.length === 0) {
      return
    }

    window.requestAnimationFrame(() => {
      const spentTimeReading = new Date().getTime()
      const secondsReading = Math.round(
        (spentTimeReading - readingStartedAt) / 1000
      )

      trackCustomEvent({
        category: "content",
        action: "reading",
        label: contentType,
        value: secondsReading,
      })

      typeof window !== "undefined" &&
        typeof window.gtag !== "undefined" &&
        window.gtag("event", "reading", {
          event_category: "content",
          event_label: contentType,
          value: secondsReading,
        })
    })

    const readState: ReadState = readRepository[props.id] || {
      status: ReadStatuses.READING,
      changed_at: new Date(),
    }

    if (readState.status == ReadStatuses.FINISHED) {
      // content was read fully once. Don't reset that status
      return
    }

    readState.status = ReadStatuses.READING
    readState.changed_at = new Date()

    readRepository[props.id] = readState
    saveReadRepository(readRepository)
  }

  const trackReadingEnd = (
    intersectedSections: IntersectionObserverEntry[]
  ): void => {
    const endSection: IntersectionObserverEntry = intersectedSections[0]

    if (!endSection.isIntersecting || endSection.intersectionRatio <= 0) {
      return
    }

    if (readingEnded) {
      // already tracked end of reading
      return
    }

    const endedAt: number = new Date().getTime()

    setReadingEnded(true)
    setReadingEndedAt(endedAt)

    const secondsUntilEndedReading = Math.round(
      (readingEndedAt - readingStartedAt) / 1000
    )

    window.requestAnimationFrame(() => {
      trackCustomEvent({
        category: "content",
        action: "endReading",
        label: contentType,
        value: secondsUntilEndedReading,
      })

      typeof window !== "undefined" &&
        typeof window.gtag !== "undefined" &&
        window.gtag("event", "endReading", {
          event_category: "content",
          event_label: contentType,
          value: secondsUntilEndedReading,
        })
    })

    const readState: ReadState = readRepository[props.id]

    if (readState && readState.status == ReadStatuses.FINISHED) {
      // content was read fully once. Don't reset that status
      return
    }

    readRepository[props.id] = {
      status: ReadStatuses.FINISHED,
      changed_at: new Date(),
    }
    saveReadRepository(readRepository)
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const articleStart: HTMLElement = document.getElementById("intro")
    const articleEnd: HTMLElement = document.getElementById("content-end")

    const mainSections: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll(`.content h2[id]`)
    )

    const subSections: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll(".content h3[id]")
    )
    const allSections: HTMLElement[] = mainSections.concat(subSections)

    const readingStartObserver = new IntersectionObserver(trackReadingStart)
    const readingEndObserver = new IntersectionObserver(trackReadingEnd)
    const readingObserver = new IntersectionObserver(trackReading)

    allSections.forEach((section) => {
      readingObserver.observe(section)
    })

    readingStartObserver.observe(articleStart)
    readingEndObserver.observe(articleEnd)
  }, [])

  return (
    <>
      <div id="intro" />
      {props.children}
      <div id="content-end" />
    </>
  )
}

export default ReadingTracker
