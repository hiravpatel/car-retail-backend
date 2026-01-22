import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ResponseHandler } from '../utils/ResponseHandler';

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }

    return ResponseHandler.error(res, message, statusCode, err.stack);
};
