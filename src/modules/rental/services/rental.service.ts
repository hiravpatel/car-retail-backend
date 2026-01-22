import { BookingRepository } from '../repositories/rental.repository';
import { VehicleRepository } from '../../vehicle/repositories/vehicle.repository';
import { AppError } from '../../../core/errors/AppError';

export class RentalService {
    private bookingRepository: BookingRepository;
    private vehicleRepository: VehicleRepository;

    constructor() {
        this.bookingRepository = new BookingRepository();
        this.vehicleRepository = new VehicleRepository();
    }

    async createBooking(userId: string, data: any) {
        const vehicle = await this.vehicleRepository.findById(data.vehicleId);
        if (!vehicle) throw new AppError('Vehicle not found', 404);
        if (vehicle.status !== VehicleStatus.AVAILABLE) {
            throw new AppError('Vehicle is not available for rental', 400);
        }

        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        if (startDate >= endDate) {
            throw new AppError('End date must be after start date', 400);
        }

        const conflicts = await this.bookingRepository.findActiveBookingsByVehicle(
            data.vehicleId,
            startDate,
            endDate
        );

        if (conflicts.length > 0) {
            throw new AppError('Vehicle is already booked for these dates', 400);
        }

        // Calculate total amount
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalAmount = days * vehicle.rentalPrice;

        return this.bookingRepository.create({
            userId,
            vehicleId: data.vehicleId,
            startDate,
            endDate,
            totalAmount,
            status: BookingStatus.PENDING,
        });
    }

    async updateBookingStatus(id: string, status: BookingStatus) {
        const booking = await this.bookingRepository.findById(id);
        if (!booking) throw new AppError('Booking not found', 404);
        return this.bookingRepository.updateStatus(id, status);
    }

    async getAllBookings(filter: any) {
        return this.bookingRepository.findAll(filter);
    }

    async getBookingById(id: string) {
        const booking = await this.bookingRepository.findById(id);
        if (!booking) throw new AppError('Booking not found', 404);
        return booking;
    }
}
