import { OrderRepository } from "src/domain/order/order.repository";
import { OrderMysqlRepository } from "../../adapters/order.mysql.repository";

export const orderRepositoryProvider = {
    provide: OrderRepository,
    useClass: OrderMysqlRepository,
};
