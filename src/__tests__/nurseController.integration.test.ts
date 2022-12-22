import request from 'supertest';

import app from '../index';

import {fetchUserByEmail} from '../services/userSerivces';
import {fetchUnmodifiedNurseById, fetchNurseById} from '../services/nurseServices';

describe('Nurses', () => {
  // Tests User Login
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImNhcmxvcyBjb25kaXQiLCJlbWFpbCI6ImNvbmRpdEBsaXZlLmNvbSIsImlhdCI6MTY3MTU5MTc5Mn0.S8Dk7nTGcMpB2HmD4tFUUOVuFd4JO2dMmp14ieQa1gw';
  let createdNurse:any;
  describe('Create nurse', () => {
    it('should should create a nurse', async () => {
      const expectedResponse = {
            "message": "No token provided."
        };
      const response = await request(app)
        .post('/nurses')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          full_name:"britta perryy", 
          contact:"99913", 
          email: "britta@live.comm"
        })
        .expect(200)

      createdNurse = response.body;
      // console.log('created',createdNurse);
      // Assert
      const user = await fetchUnmodifiedNurseById(createdNurse.id);
      // console.log('user',user)
      const { full_name, email, contact } = createdNurse;
      expect({full_name,email,contact}).toMatchObject({
        full_name: user.full_name,
        email: user.email,
        contact: user.contact
      });
    });

  });

  describe('Update user', () => {
    it('should update user', async () => {

      const response = await request(app)
      .put('/nurses/' + createdNurse.id)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .send({
        full_name:"britta perryy edited", 
        contact:"99913", 
        email: "britta@live.comm"
      })
      .expect(200);

      createdNurse = response.body;
      // console.log('created',createdNurse);
      // Assert
      const user = await fetchNurseById(createdNurse.id);
      console.log('updated',user)
      const { full_name, email, contact } = createdNurse;
      expect({full_name,email,contact}).toMatchObject({
        full_name: user.full_name,
        email: user.email,
        contact: user.contact
      });
    });
  });


  describe('Delete Nurse', () => {
    it('should remove nurse', async () => {

      const response = await request(app)
        .delete(`/nurses/${createdNurse.id}`)
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect(200);
    });
  });
});
