import { Request, Response, NextFunction } from 'express';
import { TokenUtils } from '../../utils/auth.utils';
import { AppError } from '../errors/AppError';
import prisma from '../../config/prisma';

export const protect = async (req: any, res: Response, next: NextFunction) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        const decoded = TokenUtils.verifyToken(token);

        const currentUser = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { role: true },
        });

        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        req.user = currentUser;
        next();
    } catch (error) {
        next(new AppError('Invalid token', 401));
    }
};

export const restrictTo = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role.name)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
