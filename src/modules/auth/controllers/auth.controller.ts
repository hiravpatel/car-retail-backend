import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import asyncHandler from 'express-async-handler';
import { ResponseHandler } from '../../../core/utils/ResponseHandler';

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    ResponseHandler.success(res, result, 'User registered successfully', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    ResponseHandler.success(res, result, 'Login successful');
});
