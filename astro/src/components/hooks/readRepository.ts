import useLocalStorage from "./storage"

export enum ContentTypes {
  BLOG = "blog",
  THOUGHT = "thought",
  PROJECT = "project",
}

export enum ReadStatuses {
  READING = 1,
  FINISHED = 2,
}

export interface ReadState {
  changed_at: Date
  status: undefined | ReadStatuses
}

interface ReadRepository {
  [key: string]: ReadState
}

export const getStatusLabel = (status: ReadStatuses | undefined) => {
  if (status === undefined) {
    return "unread"
  }

  if (status == ReadStatuses.READING) {
    return "reading"
  }

  if (status == ReadStatuses.FINISHED) {
    return "finished"
  }

  throw Error(`Unknown reading status: ${status}`)
}

export const isReadingFinished = (readingState: ReadState | undefined) => {
  return readingState && readingState.status == ReadStatuses.FINISHED;
}

export const getFinishedPosts = () => {
  const [finishedPosts, _] = useReadRepository(ContentTypes.BLOG)

  return finishedPosts
}

const useReadRepository = (type: ContentTypes) => {
  return useLocalStorage<ReadRepository>(`read-${type}`, {})
}

export default useReadRepository
