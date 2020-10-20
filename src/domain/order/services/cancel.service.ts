import { NotCancelException } from "../exceptions/NotCancel";
import { Order, StatusOrder } from "../order";
import { OrderRepository } from "../order.repository";

export class OrderCancelService {
    constructor(private _orderRepository: OrderRepository) { }

    async run(orderId: number, order: Order) {
        const days = this.calculateDays(order);
        if (days > 30) { 
            throw new NotCancelException('The order cannot be canceled, more than 30 days have passed');
        }
        await this._orderRepository.updateStatusById(orderId, StatusOrder.cancel);
    }

    private calculateDays(order: Order): number {
        const currentDate = new Date();
        const difference = currentDate.getTime() - order.dateBuy.getTime();
        const days = difference / (1000 * 3600 * 24);
        return days;
    }
}