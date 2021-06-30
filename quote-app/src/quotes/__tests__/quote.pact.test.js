const path = require('path');
const { Pact, Matchers } = require('@pact-foundation/pact');
const { fetchQuote } = require('../fetchQuote');

describe('Quotes App Pact tests', () => {
  const pact = new Pact({
    consumer: 'quoteConsumer',
    provider: 'quoteProvider',
    cors: true,
    log: path.resolve(process.cwd(), 'pacts', 'logs', 'pact-consumer.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'ERROR',
  });

  const quoteMatcher = {
    author: Matchers.string('Will Shakespeare'),
    text: Matchers.string(
      'All the world’s a stage, And all the men and women merely players;'
    ),
  };

  beforeAll(async () => {
    await pact.setup();
  }, 10000);

  afterEach(() => pact.verify());

  afterAll(() => pact.finalize());

  test('Get a quote', async () => {
    await pact.addInteraction({
      uponReceiving: 'A request for a quote',
      withRequest: {
        method: 'GET',
        path: '/quote',
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: Matchers.eachLike(quoteMatcher, { min: 1, count: 10 }),
      },
    });

    await expect(fetchQuote(pact.mockService.baseUrl)).resolves.toEqual(
      'All the world’s a stage, And all the men and women merely players;'
    );
  });
});
