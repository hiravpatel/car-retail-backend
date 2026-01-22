import prisma from '../../../config/prisma';

export class ReportRepository {
    async getRevenueStats() {
        const bookingRevenue = await prisma.booking.aggregate({
            _sum: { totalAmount: true },
        });
        const saleRevenue = await prisma.sale.aggregate({
            _sum: { finalPrice: true },
        });
        return {
            rentalRevenue: bookingRevenue._sum.totalAmount || 0,
            salesRevenue: saleRevenue._sum.finalPrice || 0,
            totalRevenue: (bookingRevenue._sum.totalAmount || 0) + (saleRevenue._sum.finalPrice || 0),
        };
    }

    async getVehicleStats() {
        const statusCounts = await prisma.vehicle.groupBy({
            by: ['status'],
            _count: true,
        });
        return statusCounts;
    }

    async createReport(data: any) {
        return prisma.report.create({ data });
    }

    async findAll() {
        return prisma.report.findMany();
    }
}
