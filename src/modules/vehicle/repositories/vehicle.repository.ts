import { VehicleStatus } from '@prisma/client';
import prisma from '../../../config/prisma';

export class VehicleRepository {
    async findAll(filter: any = {}) {
        return prisma.vehicle.findMany({
            where: filter,
            include: { category: true },
        });
    }

    async findById(id: string) {
        return prisma.vehicle.findUnique({
            where: { id },
            include: { category: true },
        });
    }

    async create(data: any) {
        return prisma.vehicle.create({
            data,
            include: { category: true },
        });
    }

    async update(id: string, data: any) {
        return prisma.vehicle.update({
            where: { id },
            data,
            include: { category: true },
        });
    }

    async delete(id: string) {
        return prisma.vehicle.delete({
            where: { id },
        });
    }

    async findCategoryByName(name: string) {
        return prisma.vehicleCategory.findUnique({
            where: { name },
        });
    }

    async createCategory(name: string) {
        return prisma.vehicleCategory.create({
            data: { name },
        });
    }

    async findAllCategories() {
        return prisma.vehicleCategory.findMany();
    }
}
