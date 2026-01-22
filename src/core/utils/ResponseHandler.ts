import { Response } from 'express';

export class ResponseHandler {
    static success(res: Response, data: any, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            status: 'success',
            message,
            data,
        });
    }

    static error(res: Response, message: string, statusCode = 500, stack?: string) {
        return res.status(statusCode).json({
            status: 'error',
            message,
            stack: process.env.NODE_ENV === 'development' ? stack : undefined,
        });
    }
}
