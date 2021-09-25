import * as core from '@actions/core';
import axios from 'axios';
import type { Context, PullRequestPayload } from '../../types';

const BASE_URL = 'https://api.telegram.org/bot';

export async function handlePullRequest(context: Context<PullRequestPayload>) {
  switch (context.payload.action) {
    case 'opened':
      return await handleOpenedAction(context);
    default:
      return await handleUnsupportedAction(context);
  }
}

//-------------------------------------
//- private
//-------------------------------------
async function handleOpenedAction(context: Context<PullRequestPayload>) {
  const TELEGRAM_BOT_TOKEN = core.getInput('TELEGRAM_BOT_TOKEN');
  const TELEGRAM_CHAT_ID = core.getInput('TELEGRAM_CHAT_ID');
  const SEND_MESSAGE_URL = `${BASE_URL}${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const pr = context.payload.pull_request;

  axios.post(SEND_MESSAGE_URL, {
    chat_id: TELEGRAM_CHAT_ID,
    parse_mode: 'Markdown',
    text: `
New PR: ${pr.title}
From: ${context.payload.sender.login}
${pr.body}`
  });
}

async function handleUnsupportedAction(context: Context<PullRequestPayload>) {
}
