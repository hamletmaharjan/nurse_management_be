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
    });
});
