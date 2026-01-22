import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';
import asyncHandler from 'express-async-handler';

const reportService = new ReportService();

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
    const result = await reportService.getDashboardStats();
    res.status(200).json({ status: 'success', data: result });
});

export const getAllReports = asyncHandler(async (req: Request, res: Response) => {
    const result = await reportService.getAllReports();
    res.status(200).json({ status: 'success', data: result });
});
