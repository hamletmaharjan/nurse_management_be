// import fs from "fs";
// import path from "path";
// import { NextFunction, Request, Response } from 'express';

// const {LocalFileData} = require('get-file-object-from-local-path');

// import imageValidator from '../validators/imageValidator';

// let imageId: string;
// let imageURL: string;

// let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let nextFunction: NextFunction = jest.fn();

//   beforeEach(() => {
//       mockRequest = {};
//       mockResponse = {
//           json: jest.fn(),
//         };
//   });

// describe("file util tests", () => {
//   test("upload image to cloudinary", async () => {
//     // const file = fs.readFileSync(path.join(__dirname, "./images/sample.pdf"), "utf8");

//     const file = LocalFileData(path.join(__dirname, "./images/sample.pdf"));
//     console.log('file',file)

//     function callback(data:any, isSuccess:any) {
//       expect(data).toBe(Error('Only image files are allowed!'));
//     }
//     imageValidator(mockRequest as Request, file, callback);

//   //   imageURL = (await uploadImageToCloudinary(file, "test")) as string;

//   });
  
// });