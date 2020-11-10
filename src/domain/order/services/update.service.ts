import { StatusOrder } from "../order";
import { OrderRepository } from "../order.repository";

export class OrderUpdateService {
    constructor(private _orderRepository: OrderRepository) { }

    async run(id: number, status: StatusOrder) {
        await this._orderRepository.updateStatusById(id, status);
    }
}