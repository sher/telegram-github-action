export type Context<T> = {
  eventName: string,
  payload: T
}

export type User = {
  avatar_url?: string,
  id?: number,
  login?: string,
  site_admin?: boolean
}

export type PullRequest = {
  assignee?: User,
  assignees?: User[],
  number: number,
  body: string,
  html_url: string,
  id?: number,
  labels?: string[],
  state?: string,
  title?: string,
  url?: string,
  user?: User
}

export type PullRequestPayload = {
  action: string,
  pull_request: PullRequest,
  sender: User,
  assignee?: User
}
