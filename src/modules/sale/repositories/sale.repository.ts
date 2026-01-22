import prisma from '../../../config/prisma';

export class SaleRepository {
    async create(data: any) {
        return prisma.$transaction(async (tx: { sale: { create: (arg0: { data: any; include: { vehicle: boolean; user: boolean; }; }) => any; }; vehicle: { update: (arg0: { where: { id: any; }; data: { status: VehicleStatus; }; }) => any; }; }) => {
            const sale = await tx.sale.create({
                data,
                include: { vehicle: true, user: true },
            });

            await tx.vehicle.update({
                where: { id: data.vehicleId },
                data: { status: VehicleStatus.SOLD },
            });

            return sale;
        });
    }

    async findById(id: string) {
        return prisma.sale.findUnique({
            where: { id },
            include: { vehicle: true, user: true, payment: true },
        });
    }

    async findAll(filter: any = {}) {
        return prisma.sale.findMany({
            where: filter,
            include: { vehicle: true, user: true },
        });
    }
}
