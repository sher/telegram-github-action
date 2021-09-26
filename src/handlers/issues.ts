import * as core from '@actions/core';
import axios from 'axios';
import type { Context, IssuePayload } from '../../types';

const BASE_URL = 'https://api.telegram.org/bot';

export async function handleIssues(context: Context<IssuePayload>) {
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
async function handleOpenedAction(context: Context<IssuePayload>) {
  const issue = context.payload.issue;
  const text = `
${context.payload.sender.login} opened new issue [${issue.title}](${issue.html_url})
${issue.body}`;
  return await sendMessage(text);
}

async function handleReopenedAction(context: Context<IssuePayload>) {
  const issue = context.payload.issue;
  const text = `
${context.payload.sender.login} reopened issue [${issue.title}](${issue.html_url})`;
  return await sendMessage(text);
}

async function handleClosedAction(context: Context<IssuePayload>) {
  const issue = context.payload.issue;
  const text = `
${context.payload.sender.login} closed issue [${issue.title}](${issue.html_url})`;
  return await sendMessage(text);
}

async function handleUnsupportedAction(context: Context<IssuePayload>) {
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
