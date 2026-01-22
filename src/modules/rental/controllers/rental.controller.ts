import { Request, Response } from 'express';
import { RentalService } from '../services/rental.service';
import asyncHandler from 'express-async-handler';

const rentalService = new RentalService();

export const createBooking = asyncHandler(async (req: any, res: Response) => {
    const result = await rentalService.createBooking(req.user.id, req.body);
    res.status(201).json({ status: 'success', data: result });
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
    const result = await rentalService.updateBookingStatus(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, req.body.status);
    res.status(200).json({ status: 'success', data: result });
});

export const getAllBookings = asyncHandler(async (req: Request, res: Response) => {
    const result = await rentalService.getAllBookings(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
    const result = await rentalService.getBookingById(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    res.status(200).json({ status: 'success', data: result });
});
