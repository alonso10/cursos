import { Order } from "../order";
import { OrderRepository } from "../order.repository";

export class OrderRegisterService {
    constructor(private _orderRepository: OrderRepository) { }

    async run(order: Order) {
        await this._orderRepository.store(order)
    }
}