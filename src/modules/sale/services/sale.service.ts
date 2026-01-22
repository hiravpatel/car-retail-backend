import { SaleRepository } from '../repositories/sale.repository';
import { VehicleRepository } from '../../vehicle/repositories/vehicle.repository';
import { AppError } from '../../../core/errors/AppError';

export class SaleService {
    private saleRepository: SaleRepository;
    private vehicleRepository: VehicleRepository;

    constructor() {
        this.saleRepository = new SaleRepository();
        this.vehicleRepository = new VehicleRepository();
    }

    async createSale(adminId: string, data: any) {
        const vehicle = await this.vehicleRepository.findById(data.vehicleId);
        if (!vehicle) throw new AppError('Vehicle not found', 404);
        if (vehicle.status !== VehicleStatus.AVAILABLE) {
            throw new AppError('Vehicle is not available for sale', 400);
        }

        const price = vehicle.salePrice;
        const discount = data.discount || 0;
        const tax = data.tax || 0;
        const finalPrice = price - discount + tax;

        return this.saleRepository.create({
            userId: data.customerId, // The buyer
            vehicleId: data.vehicleId,
            price,
            discount,
            tax,
            finalPrice,
        });
    }

    async getAllSales(filter: any) {
        return this.saleRepository.findAll(filter);
    }

    async getSaleById(id: string) {
        const sale = await this.saleRepository.findById(id);
        if (!sale) throw new AppError('Sale record not found', 404);
        return sale;
    }
}
