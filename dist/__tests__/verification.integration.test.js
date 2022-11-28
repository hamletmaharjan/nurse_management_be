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
Object.defineProperty(exports, "__esModule", { value: true });
const verification_1 = require("../middlewares/verification");
describe('Authorization middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            // status: jest.fn().mockReturnThis(),
        };
    });
    test('without headers', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = {
            "message": "No token provided."
        };
        (0, verification_1.verification)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    }));
    test('without "authorization" header', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = {
            "message": "No token provided."
        };
        mockRequest = {
            headers: {}
        };
        (0, verification_1.verification)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    }));
    test('with "authorization" header', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest = {
            headers: {
                'authorization': 'Bearer abc'
            }
        };
        const expectedResponse = {
            message: 'Failed to authenticate token.'
        };
        (0, verification_1.verification)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        // expect(nextFunction).toBeCalledTimes(1);
    }));
});
