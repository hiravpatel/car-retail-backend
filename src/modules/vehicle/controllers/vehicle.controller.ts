import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicle.service';
import asyncHandler from 'express-async-handler';

const vehicleService = new VehicleService();

export const getAllVehicles = asyncHandler(async (req: Request, res: Response) => {
    const result = await vehicleService.getAllVehicles(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const getVehicleById = asyncHandler(async (req: Request, res: Response) => {
    const result = await vehicleService.getVehicleById(req.params.id as string);
    res.status(200).json({ status: 'success', data: result });
});

export const createVehicle = asyncHandler(async (req: Request, res: Response) => {
    const result = await vehicleService.createVehicle(req.body);
    res.status(201).json({ status: 'success', data: result });
});

export const updateVehicle = asyncHandler(async (req: Request, res: Response) => {
    const result = await vehicleService.updateVehicle(req.params.id as string, req.body);
    res.status(200).json({ status: 'success', data: result });
});

export const deleteVehicle = asyncHandler(async (req: Request, res: Response) => {
    await vehicleService.deleteVehicle(req.params.id as string);
    res.status(204).json({ status: 'success', data: null });
});

export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const result = await vehicleService.getAllCategories();
    res.status(200).json({ status: 'success', data: result });
});
