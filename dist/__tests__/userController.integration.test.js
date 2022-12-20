"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const userSerivces_1 = require("../services/userSerivces");
describe('Users', () => {
    let signupUser;
    let loggedInUser;
    // Tests User Login
    describe('User Login', () => {
        it('should login user', () => __awaiter(void 0, void 0, void 0, function* () {
            let response;
            response = yield (0, supertest_1.default)(index_1.default)
                .post('/auth/signin')
                .set('Accept', 'application/json')
                .send({
                email: 'condit@live.com',
                password: 'conditpwd'
            })
                .expect(200);
            // loggedInUser = response.body.data;
            // Assert
            const user = yield (0, userSerivces_1.fetchUserByEmail)(response.body.email);
            expect(response.body).toMatchObject({
                id: user.id,
                token: expect.any(String),
                email: user.email
            });
        }));
        it('should throw invalid email or password', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .post('/auth/signin')
                .set('Accept', 'application/json')
                .send({
                email: 'condit@live.com',
                password: 'invalidpwd'
            })
                .expect(401);
            // Assert
            expect(response.body).toMatchObject({
                message: 'Incorrect email or password'
            });
        }));
        //   it('should fail login user', async () => {
        //     await request(app)
        //       .post('/api/v1/login')
        //       .set('Accept', 'application/json')
        //       .send({
        //         email: '',
        //         password: ''
        //       })
        //       .expect(400);
        //   });
        // });
        // // Test User Sign Up
        // describe('User Sign Up', () => {
        //   it('should sign up user', async () => {
        //     signupUser = await request(app)
        //       .post('/api/v1/signup')
        //       .set('Accept', 'application/json')
        //       .send({
        //         email: 'biswas.test12453@gmail.com',
        //         password: 'hello',
        //         firstName: 'test',
        //         lastName: 'user'
        //       })
        //       .expect(201);
        //     // Assert
        //     const user = await fetchById(signupUser.body.data.id);
        //     expect(signupUser.body).toMatchObject({
        //       status: 201,
        //       data: {
        //         id: user.data.id,
        //         email: user.data.email,
        //         firstName: user.data.firstName,
        //         lastName: user.data.lastName,
        //         accessToken: expect.any(String),
        //         refreshToken: expect.any(String)
        //       },
        //       message: 'Successfully created the User.'
        //     });
        //   });
        //   it('should return 500 error saying email already exists', async () => {
        //     let user: any;
        //     user = await request(app)
        //       .post('/api/v1/signup')
        //       .set('Accept', 'application/json')
        //       .send({
        //         email: 'biswas.test12453@gmail.com',
        //         password: 'hello',
        //         firstName: 'test',
        //         lastName: 'user'
        //       })
        //       .expect(500);
        //     // Assert
        //     expect(user.body).toMatchObject({
        //       status: 500,
        //       data: {
        //         info: 'Email already exists.'
        //       },
        //       message: 'Error while creating the User.'
        //     });
        //   });
        //   // Remove User
        //   describe('User Remove', () => {
        //     it('should remove user', async () => {
        //       let response: any;
        //       const userId: number = signupUser.body.data.id;
        //       response = await request(app)
        //         .delete(`/api/v1/users/${userId}`)
        //         .set('Authorization', `Bearer ${signupUser.body.data.accessToken}`)
        //         .set('Accept', 'application/json')
        //         .expect(200);
        //     });
        //   });
    });
});
