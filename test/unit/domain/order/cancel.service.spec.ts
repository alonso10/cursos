import { SinonStubbedInstance } from "sinon";
import { Order, StatusOrder } from "src/domain/order/order";
import { OrderRepository } from "src/domain/order/order.repository";
import { OrderCancelService } from "src/domain/order/services/cancel.service";
import { OrderBuilder } from "test/utils/builders/order.builder";
import { createStubObj } from "test/utils/stubs/creaye-object.stub";

describe('Order cancel service', () => { 
    let _orderCancelService: OrderCancelService;
    let _orderRepositryStub: SinonStubbedInstance<OrderRepository>;
    let _order: Order;

    beforeEach(() => {
        _orderRepositryStub = createStubObj<OrderRepository>(['store', 'updateById', 'updateStatusById', 'listByUserId']);
        _orderCancelService = new OrderCancelService(_orderRepositryStub);        
    });

    it('cancel order', async () => {
        _order = new OrderBuilder().withDateBuy(new Date()).build();
        await _orderCancelService.run(_order.id, _order);
        expect(_orderRepositryStub.updateStatusById.getCalls().length).toBe(1);
        expect(_orderRepositryStub.updateStatusById.calledWith(_order.id, StatusOrder.cancel)).toBeTruthy();
    });

    it('cancel order', async () => {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setDate(lastMonth.getDate() - 31);
        _order = new OrderBuilder().withDateBuy(lastMonth).build();
        await expect(
            _orderCancelService.run(_order.id, _order)
        ).rejects.toThrow('The order cannot be canceled, more than 30 days have passed');
    });
});