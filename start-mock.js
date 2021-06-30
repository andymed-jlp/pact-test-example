#!/usr/bin/env node

/**
 * Starts up a pact stub server
 *
 * Please add your own pact files here for every app you develop
 * This can be used as a stub server for building the UI
 */

const pact = require('@pact-foundation/pact-core');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const PORT = 8080;

pact
  .createStub({
    cors: true,
    port: PORT,
    pactUrls: [`${process.cwd()}/pacts/quoteconsumer-quoteprovider.json`],
  })
  .start()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`Stub server running on port ${PORT}. Press q to quit.`);
  });

process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q') {
    pact.removeAllStubs().then(() => {
      process.exit();
    });
  }
});
