import request from 'supertest';

import app from '../index';

import { fetchUserByEmail } from '../services/userSerivces';

describe('Users', () => {
  // Tests User Login
  describe('User Login', () => {
    it('should login user', async () => {
      const response = await request(app)
        .post('/auth/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'condit@live.com',
          password: 'conditpwd',
        })
        .expect(200);

      // Assert
      const user = await fetchUserByEmail(response.body.email);
      expect(response.body).toMatchObject({
        id: user.id,
        token: expect.any(String),
        email: user.email,
      });
    });

    it('should throw invalid email or password', async () => {
      const response = await request(app)
        .post('/auth/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'condit@live.com',
          password: 'invalidpwd',
        })
        .expect(401);

      // Assert
      expect(response.body).toMatchObject({
        message: 'Incorrect email or password',
      });
    });
  });
});
