import { VehicleRepository } from '../repositories/vehicle.repository';
import { AppError } from '../../../core/errors/AppError';

export class VehicleService {
    private vehicleRepository: VehicleRepository;

    constructor() {
        this.vehicleRepository = new VehicleRepository();
    }

    async getAllVehicles(filter: any) {
        return this.vehicleRepository.findAll(filter);
    }

    async getVehicleById(id: string) {
        const vehicle = await this.vehicleRepository.findById(id);
        if (!vehicle) throw new AppError('Vehicle not found', 404);
        return vehicle;
    }

    async createVehicle(data: any) {
        let category = await this.vehicleRepository.findCategoryByName(data.categoryName);
        if (!category) {
            category = await this.vehicleRepository.createCategory(data.categoryName);
        }

        const { categoryName, ...rest } = data;
        return this.vehicleRepository.create({
            ...rest,
            categoryId: category.id,
        });
    }

    async updateVehicle(id: string, data: any) {
        await this.getVehicleById(id);
        return this.vehicleRepository.update(id, data);
    }

    async deleteVehicle(id: string) {
        await this.getVehicleById(id);
        return this.vehicleRepository.delete(id);
    }

    async getAllCategories() {
        return this.vehicleRepository.findAllCategories();
    }
}
