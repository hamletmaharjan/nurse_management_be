"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
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
        (0, supertest_1.default)(index_1.default)
            .get(`/`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body).toMatchObject({ 'message': 'Hello World' });
            done();
        });
    });
});
