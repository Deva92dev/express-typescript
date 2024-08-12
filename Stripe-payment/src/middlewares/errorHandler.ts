import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

interface CustomError {
  statusCode: number;
  msg: string;
}

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(err)
    let customError: CustomError = {
      // set default
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || `Something went wrong try again later`,
    };

    // Validation error related to schema definitions, model
    if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors)
        .map((item: any) => item.message)
        .join(',');
      customError.statusCode = 400;
    }

    if (err.code && err.code === 11000) {
      customError.msg = `Duplicate value has been entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`;
      customError.statusCode = 400;
    }

    if (err.name === 'CastError') {
      customError.msg = `No value found for this id ${err.value}`;
      customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Internal server error',
    });
  }
};
