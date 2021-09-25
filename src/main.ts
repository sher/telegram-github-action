import * as core from '@actions/core';
import * as github from '@actions/github';

run();

async function run(): Promise<void> {
  console.log(github.context);
}
