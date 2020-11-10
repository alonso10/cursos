import { OrderRepository } from "src/domain/order/order.repository";
import { OrderRegisterService } from "src/domain/order/services/register.service";

export function orderRegisterServiceProvider(orderRepository: OrderRepository) {
    return new OrderRegisterService(orderRepository);
}