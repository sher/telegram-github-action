import * as github from '@actions/github';

import { handlePullRequest } from './handlers/pull-request';
import { Context, PullRequestPayload } from '../types';

run();

async function run(): Promise<void> {
  switch (github.context.eventName) {
    case 'pull_request':
      return await handlePullRequest(github.context as Context<PullRequestPayload>);
    default:
      return await handleUnsupportedEvent();
  }
}

async function handleUnsupportedEvent() {
}
