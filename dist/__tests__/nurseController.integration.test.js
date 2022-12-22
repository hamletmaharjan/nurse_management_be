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
const nurseServices_1 = require("../services/nurseServices");
describe('Nurses', () => {
    // Tests User Login
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImNhcmxvcyBjb25kaXQiLCJlbWFpbCI6ImNvbmRpdEBsaXZlLmNvbSIsImlhdCI6MTY3MTU5MTc5Mn0.S8Dk7nTGcMpB2HmD4tFUUOVuFd4JO2dMmp14ieQa1gw';
    let createdNurse;
    describe('Create nurse', () => {
        it('should should create a nurse', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedResponse = {
                "message": "No token provided."
            };
            const response = yield (0, supertest_1.default)(index_1.default)
                .post('/nurses')
                .set('Authorization', token)
                .set('Accept', 'application/json')
                .send({
                full_name: "britta perryy",
                contact: "99913",
                email: "britta@live.comm"
            })
                .expect(200);
            createdNurse = response.body;
            // console.log('created',createdNurse);
            // Assert
            const user = yield (0, nurseServices_1.fetchUnmodifiedNurseById)(createdNurse.id);
            // console.log('user',user)
            const { full_name, email, contact } = createdNurse;
            expect({ full_name, email, contact }).toMatchObject({
                full_name: user.full_name,
                email: user.email,
                contact: user.contact
            });
        }));
    });
    describe('Update user', () => {
        it('should update user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .put('/nurses/' + createdNurse.id)
                .set('Authorization', token)
                .set('Accept', 'application/json')
                .send({
                full_name: "britta perryy edited",
                contact: "99913",
                email: "britta@live.comm"
            })
                .expect(200);
            createdNurse = response.body;
            // console.log('created',createdNurse);
            // Assert
            const user = yield (0, nurseServices_1.fetchNurseById)(createdNurse.id);
            console.log('updated', user);
            const { full_name, email, contact } = createdNurse;
            expect({ full_name, email, contact }).toMatchObject({
                full_name: user.full_name,
                email: user.email,
                contact: user.contact
            });
        }));
    });
    describe('Delete Nurse', () => {
        it('should remove nurse', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .delete(`/nurses/${createdNurse.id}`)
                .set('Authorization', token)
                .set('Accept', 'application/json')
                .expect(200);
        }));
    });
});
