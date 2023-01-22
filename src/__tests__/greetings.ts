import request from 'supertest';

import app from '../index';

describe('GET /', () => {
  it('should return 200 & valid response if request param list is empity', done => {
    request(app)
      .get(`/`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ message: 'Hello World' });
        done();
      });
  });
});
