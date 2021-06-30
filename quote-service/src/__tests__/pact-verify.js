const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { startServer } = require('..');

describe('Pact Verification', () => {
  const opts = {
    log: path.resolve(process.cwd(), 'pacts', 'logs', 'pact-provider.log'),
    pactUrls: [`${process.cwd()}/pacts/quoteconsumer-quoteprovider.json`],
    providerBaseUrl: `http://localhost:8080/`,
  };

  beforeAll(async () => {});

  test('should validate the expectations of Quote App', () => {
    return new Verifier(opts).verifyProvider().then(function () {
      console.log("I'm done");
    });
  });
});
