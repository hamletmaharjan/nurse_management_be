import { NextFunction, Request, Response } from 'express';
import {verification as tokenVerification} from '../middlewares/verification';

describe('Authorization middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            // status: jest.fn().mockReturnThis(),
          };
    });

    test('without headers', async () => {
        const expectedResponse = {
            "message": "No token provided."
        };
        tokenVerification(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('without "authorization" header', async () => {
        const expectedResponse = {
            "message": "No token provided."
        };
        mockRequest = {
            headers: {
            }
        }
        tokenVerification(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('with "authorization" header', async () => {
        mockRequest = {
            headers: {
                'authorization': 'Bearer abc'
            }
        }

        const expectedResponse = {
             message: 'Failed to authenticate token.'
        };
        tokenVerification(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        // expect(nextFunction).toBeCalledTimes(1);
    });
});