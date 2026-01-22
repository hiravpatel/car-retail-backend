import prisma from '../../../config/prisma';

export class PaymentRepository {
    async create(data: any) {
        return prisma.payment.create({
            data,
            include: { user: true },
        });
    }

    async findById(id: string) {
        return prisma.payment.findUnique({
            where: { id },
            include: { user: true, booking: true, sale: true },
        });
    }

    async updateStatus(id: string, status: PaymentStatus) {
        return prisma.payment.update({
            where: { id },
            data: { status },
        });
    }

    async findAll(filter: any = {}) {
        return prisma.payment.findMany({
            where: filter,
            include: { user: true },
        });
    }
}
