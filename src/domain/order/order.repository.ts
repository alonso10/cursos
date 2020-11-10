import { Nullable } from "../Nullable";
import { Order } from "./order";

export abstract class OrderRepository {
    abstract async store(order: Order): Promise<void>;
    abstract async updateStatusById(id: number, status: number): Promise<void>;
    abstract async fetchByName(name: string): Promise<Nullable<Order>>;
}