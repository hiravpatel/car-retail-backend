import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import asyncHandler from 'express-async-handler';

const paymentService = new PaymentService();

export const processPayment = asyncHandler(async (req: any, res: Response) => {
    const result = await paymentService.processPayment(req.user.id, req.body);
    res.status(201).json({ status: 'success', data: result });
});

export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    const result = await paymentService.getPaymentById(req.params.id as string);
    res.status(200).json({ status: 'success', data: result });
});

export const getAllPayments = asyncHandler(async (req: Request, res: Response) => {
    const result = await paymentService.getAllPayments(req.query);
    res.status(200).json({ status: 'success', data: result });
});
