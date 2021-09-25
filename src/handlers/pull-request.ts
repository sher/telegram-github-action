import * as core from '@actions/core';
import axios from 'axios';
import type { Context, PullRequestPayload } from '../../types';

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

  console.log(context, TELEGRAM_CHAT_ID);
}

async function handleUnsupportedAction(context: Context<PullRequestPayload>) {
}
