import { PrismaClient, RoleType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding roles...');
    const roles = [RoleType.ADMIN, RoleType.STAFF, RoleType.CUSTOMER];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role },
            update: {},
            create: { name: role },
        });
    }

    console.log('Seeding admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    const adminRole = await prisma.role.findUnique({
        where: { name: RoleType.ADMIN },
    });

    if (!adminRole) {
        throw new Error('Admin role not found. Make sure roles are seeded first.');
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            roleId: adminRole.id, // Ensure admin email always has admin role
            isVerified: true
        },
        create: {
            email: adminEmail,
            name: 'System Administrator',
            password: hashedPassword,
            phone: '1234567890',
            roleId: adminRole.id,
            isVerified: true,
        },
    });

    console.log(`Admin user seeded: ${adminUser.email}`);
    console.log('Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
