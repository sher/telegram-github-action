import * as github from '@actions/github';

import { handlePullRequest } from './handlers/pull-request';
import { handleIssues } from './handlers/issues';
import { Context, PullRequestPayload, IssuePayload } from '../types';

run();

async function run(): Promise<void> {
  switch (github.context.eventName) {
    case 'pull_request':
      return await handlePullRequest(github.context as Context<PullRequestPayload>);
    case 'issues':
      return await handleIssues(github.context as Context<IssuePayload>);
    default:
      return await handleUnsupportedEvent();
  }
}

async function handleUnsupportedEvent() {
}
