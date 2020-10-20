import { Order } from "../order";
import { OrderRepository } from "../order.repository";

export class OrderUpdateService {
    constructor(private _orderRepository: OrderRepository) { }

    async run(id: number, order: Order) {
        await this._orderRepository.updateById(id, order);
    }
}