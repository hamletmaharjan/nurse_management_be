import request from 'supertest';
import {Express} from 'express-serve-static-core'

import app from '../index';

// let server: Express

// beforeAll(async () => {
//   server = await createServer()
// })

describe('GET /', () => {
    // test("should respond with hello world", () => {
    //     const response = request(app).get("/")
    //     expect(response.statusCode).toBe(200);
    // })
    it('should return 200 & valid response if request param list is empity', done => {
        request(app)
          .get(`/`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)
            expect(res.body).toMatchObject({'message': 'Hello World'})
            done()
          })
      })
})