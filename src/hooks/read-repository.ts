import useLocalStorage from "./storage"
import { ContentTypes } from "../components/analytics/reading-tracker"

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

const useReadRepository = (type: ContentTypes) => {
  return useLocalStorage<ReadRepository>(`read-${type}`, {})
}

export default useReadRepository
