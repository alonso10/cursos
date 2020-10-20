import { StatusOrder } from "src/domain/order/order";
import { OrderBuilder } from "test/utils/builders/order.builder";

describe('Order domain', () => {

    it('Order inactive', () => {
        const order = new OrderBuilder().withDateBuy(new Date()).build();
        expect(order.isActive()).toBeFalsy();
    });

    it('Order active', () => { 
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const order = new OrderBuilder().withDateBuy(yesterday).build();
        expect(order.isActive()).toBeTruthy();
    });

    it('Order cancel', () => { 
        const order = new OrderBuilder().withStatus(StatusOrder.cancel).build();
        expect(order.status).toBe(StatusOrder.cancel);
    });
});