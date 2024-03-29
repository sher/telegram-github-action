import * as core from '@actions/core';
import axios from 'axios';
import type { Context, PullRequestPayload } from '../../types';

const BASE_URL = 'https://api.telegram.org/bot';

export async function handlePullRequest(context: Context<PullRequestPayload>) {
  switch (context.payload.action) {
    case 'opened':
      return await handleOpenedAction(context);
    case 'reopened':
      return await handleReopenedAction(context);
    case 'closed':
      return await handleClosedAction(context);
    default:
      return await handleUnsupportedAction(context);
  }
}

//-------------------------------------
//- handlers
//-------------------------------------
async function handleOpenedAction(context: Context<PullRequestPayload>) {
  const pr = context.payload.pull_request;
  const text = `
${context.payload.sender.login} opened new PR [${pr.title}](${pr.html_url})`;
  return await sendMessage(text);
}

async function handleReopenedAction(context: Context<PullRequestPayload>) {
  const pr = context.payload.pull_request;
  const text = `
${context.payload.sender.login} reopened PR [${pr.title}](${pr.html_url})`;
  return await sendMessage(text);
}

async function handleClosedAction(context: Context<PullRequestPayload>) {
  const pr = context.payload.pull_request;
  const text = `
${context.payload.sender.login} closed PR [${pr.title}](${pr.html_url})`;
  return await sendMessage(text);
}

async function handleUnsupportedAction(context: Context<PullRequestPayload>) {
}

//-------------------------------------
//- private
//-------------------------------------
async function sendMessage(text: string) {
  const TELEGRAM_BOT_TOKEN = core.getInput('TELEGRAM_BOT_TOKEN');
  const TELEGRAM_CHAT_ID = core.getInput('TELEGRAM_CHAT_ID');
  const SEND_MESSAGE_URL = `${BASE_URL}${TELEGRAM_BOT_TOKEN}/sendMessage`;

  axios.post(SEND_MESSAGE_URL, {
    chat_id: TELEGRAM_CHAT_ID,
    parse_mode: 'Markdown',
    text
  });
}
