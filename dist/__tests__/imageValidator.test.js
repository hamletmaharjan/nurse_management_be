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
const { LocalFileData } = require('get-file-object-from-local-path');
const imageValidator_1 = __importDefault(require("../validators/imageValidator"));
let mockRequest;
let mockResponse;
let nextFunction = jest.fn();
beforeEach(() => {
    mockRequest = {};
    mockResponse = {
        json: jest.fn(),
    };
});
describe("Image validator", () => {
    test("upload pdf", () => __awaiter(void 0, void 0, void 0, function* () {
        const file = {
            originalname: 'sample.pdf'
        };
        let expectedError = new Error('Only image files are allowed!');
        function callback(data, isSuccess) {
            expect(data).toEqual(expectedError);
        }
        (0, imageValidator_1.default)(mockRequest, file, callback);
    }));
    test("upload image", () => __awaiter(void 0, void 0, void 0, function* () {
        const file = {
            originalname: 'sample.jpg'
        };
        function callback(data, isSuccess) {
            expect(isSuccess).toBe(true);
        }
        (0, imageValidator_1.default)(mockRequest, file, callback);
    }));
});
