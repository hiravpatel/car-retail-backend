import { PaymentRepository } from '../repositories/payment.repository';
import { AppError } from '../../../core/errors/AppError';

export class PaymentService {
    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async processPayment(userId: string, data: any) {
        // In a real app, integrate with Stripe/PayPal here
        // For this project, we simulate the payment creation
        return this.paymentRepository.create({
            userId,
            amount: data.amount,
            method: data.method,
            bookingId: data.bookingId,
            saleId: data.saleId,
            status: PaymentStatus.PAID, // Simulate successful payment
        });
    }

    async getPaymentById(id: string) {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) throw new AppError('Payment not found', 404);
        return payment;
    }

    async getAllPayments(filter: any) {
        return this.paymentRepository.findAll(filter);
    }
}
