import { Request, Response } from 'express';
import { SaleService } from '../services/sale.service';
import asyncHandler from 'express-async-handler';

const saleService = new SaleService();

export const createSale = asyncHandler(async (req: any, res: Response) => {
    const result = await saleService.createSale(req.user.id, req.body);
    res.status(201).json({ status: 'success', data: result });
});

export const getAllSales = asyncHandler(async (req: Request, res: Response) => {
    const result = await saleService.getAllSales(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const getSaleById = asyncHandler(async (req: Request, res: Response) => {
    const result = await saleService.getSaleById(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    res.status(200).json({ status: 'success', data: result });
});
