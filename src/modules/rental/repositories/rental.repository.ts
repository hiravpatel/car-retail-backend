import prisma from '../../../config/prisma';

export class BookingRepository {
    async findActiveBookingsByVehicle(vehicleId: string, startDate: Date, endDate: Date) {
        return prisma.booking.findMany({
            where: {
                vehicleId,
                status: { in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] },
                OR: [
                    { startDate: { lte: endDate }, endDate: { gte: startDate } },
                ],
            },
        });
    }

    async create(data: any) {
        return prisma.$transaction(async (tx: { booking: { create: (arg0: { data: any; include: { vehicle: boolean; user: boolean; }; }) => any; }; vehicle: { update: (arg0: { where: { id: any; }; data: { status: VehicleStatus; }; }) => any; }; }) => {
            const booking = await tx.booking.create({
                data,
                include: { vehicle: true, user: true },
            });

            // Initially we don't change vehicle status to RENTED until confirmed/picked up
            // but for this flow we can mark it as RENTED if confirmed immediately
            if (booking.status === BookingStatus.CONFIRMED) {
                await tx.vehicle.update({
                    where: { id: data.vehicleId },
                    data: { status: VehicleStatus.RENTED },
                });
            }

            return booking;
        });
    }

    async findById(id: string) {
        return prisma.booking.findUnique({
            where: { id },
            include: { vehicle: true, user: true, payment: true },
        });
    }

    async updateStatus(id: string, status: BookingStatus) {
        return prisma.$transaction(async (tx: { booking: { update: (arg0: { where: { id: string; }; data: { status: BookingStatus; }; include: { vehicle: boolean; }; }) => any; }; vehicle: { update: (arg0: { where: { id: any; } | { id: any; }; data: { status: VehicleStatus; } | { status: VehicleStatus; }; }) => any; }; }) => {
            const booking = await tx.booking.update({
                where: { id },
                data: { status },
                include: { vehicle: true },
            });

            if (status === BookingStatus.COMPLETED || status === BookingStatus.CANCELLED) {
                await tx.vehicle.update({
                    where: { id: booking.vehicleId },
                    data: { status: VehicleStatus.AVAILABLE },
                });
            } else if (status === BookingStatus.CONFIRMED) {
                await tx.vehicle.update({
                    where: { id: booking.vehicleId },
                    data: { status: VehicleStatus.RENTED },
                });
            }

            return booking;
        });
    }

    async findAll(filter: any = {}) {
        return prisma.booking.findMany({
            where: filter,
            include: { vehicle: true, user: true },
        });
    }
}
