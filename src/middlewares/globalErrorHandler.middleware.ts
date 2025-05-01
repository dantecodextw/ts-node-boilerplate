import { ErrorRequestHandler } from 'express';
import appConfig from '../config/app.config';

const NODE_ENV = appConfig.NODE_ENV || 'prod';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  details?: string;
  //   prismaCode?: string;
}

const globalErrorHandler: ErrorRequestHandler = (error: CustomError, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'Unknown Error';

  const response = {
    success: false,
    status: error.status,
    message: error.message,
    ...(error.details && { details: error.details }),
    ...(NODE_ENV === 'dev' && {
      stack: error.stack,
      //   prismaCode: error.prismaCode,
    }),
  };

  if (NODE_ENV === 'prod') {
    response.message = 'An unexpected error occured';
    delete response.stack;
    // delete response.prismaCode;
  }
};

export default globalErrorHandler;
