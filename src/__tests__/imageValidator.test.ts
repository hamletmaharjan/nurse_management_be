import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from 'express';

const {LocalFileData} = require('get-file-object-from-local-path');

import imageValidator from '../validators/imageValidator';


let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
      mockRequest = {};
      mockResponse = {
          json: jest.fn(),
        };
  });

describe("Image validator", () => {
  test("upload pdf", async () => {
    const file = {
      originalname : 'sample.pdf'
    }

    let expectedError = new Error('Only image files are allowed!');

    function callback(data:any, isSuccess:any) {
      expect(data).toEqual(expectedError);
    }
    imageValidator(mockRequest as Request, file, callback);
  });

  test("upload image", async () => {
    const file = {
      originalname : 'sample.jpg'
    }

    function callback(data:any, isSuccess:any) {
      expect(isSuccess).toBe(true);
    }
    imageValidator(mockRequest as Request, file, callback);
  });
  
});