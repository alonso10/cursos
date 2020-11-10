import { OrderDao } from "src/domain/order/order.dao";
import { OrderMysqlDao } from "../../adapters/order.mysql.dao";

export const orderDaoProvider = {
    provide: OrderDao,
    useClass: OrderMysqlDao,
};
