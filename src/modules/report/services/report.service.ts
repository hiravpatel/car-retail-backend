import { ReportRepository } from '../repositories/report.repository';

export class ReportService {
    private reportRepository: ReportRepository;

    constructor() {
        this.reportRepository = new ReportRepository();
    }

    async getDashboardStats() {
        const revenue = await this.reportRepository.getRevenueStats();
        const vehicles = await this.reportRepository.getVehicleStats();

        // Save as a daily report entry (optional)
        await this.reportRepository.createReport({
            type: ReportType.DAILY,
            data: { revenue, vehicles },
        });

        return { revenue, vehicles };
    }

    async getAllReports() {
        return this.reportRepository.findAll();
    }
}
