'use strict';

const mock = require('egg-mock');

describe('test/passport-coding.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/passport-coding-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, passportCoding')
      .expect(200);
  });
});
