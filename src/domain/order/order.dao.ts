import { OrderDto } from "src/application/order/query/dto/order.dto";

export abstract class OrderDao {
    abstract async listByUser(userId: number): Promise<OrderDto[]>;
}
