import prisma from '../../../config/prisma';
import { RoleType } from '@prisma/client';

export class AuthRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
    }

    async createUser(data: any) {
        return prisma.user.create({
            data,
            include: { role: true },
        });
    }

    async findRoleByName(name: RoleType) {
        return prisma.role.findUnique({
            where: { name },
        });
    }

    async seedRoles() {
        const roles = ['ADMIN', 'STAFF', 'CUSTOMER'];
        for (const name of roles) {
            await prisma.role.upsert({
                where: { name: name as unknown as RoleType },
                update: {},
                create: { name: name as unknown as RoleType },
            });
        }
    }
}
