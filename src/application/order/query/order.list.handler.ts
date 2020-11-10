import { Injectable } from "@nestjs/common";
import { OrderDao } from "src/domain/order/order.dao";
import { OrderDto } from "./dto/order.dto";

@Injectable()
export class OrderListHandler {
    constructor(private _orderDao: OrderDao) { }

    async run(userId: number): Promise<OrderDto[]> {
        return this._orderDao.listByUser(userId);
    }
}