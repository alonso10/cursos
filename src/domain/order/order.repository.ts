import { Order } from "./order";

export abstract class OrderRepository {
    abstract async store(order: Order): Promise<void>;
    abstract async updateById(id: number, order: Order): Promise<void>;
    abstract async listByUserId(userId: number): Promise<Order[]>;
    abstract async updateStatusById(id: number, status: number): Promise<void>;
}