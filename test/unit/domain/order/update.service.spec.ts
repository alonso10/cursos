import { SinonStubbedInstance } from "sinon";
import { Order } from "src/domain/order/order";
import { OrderRepository } from "src/domain/order/order.repository";
import { OrderUpdateService } from "src/domain/order/services/update.service";
import { OrderBuilder } from "test/utils/builders/order.builder";
import { createStubObj } from "test/utils/stubs/creaye-object.stub";

describe('Order update service', () => { 
    let _orderUpdateService: OrderUpdateService;
    let _orderRepositryStub: SinonStubbedInstance<OrderRepository>;
    let _order: Order;

    beforeEach(() => {
        _orderRepositryStub = createStubObj<OrderRepository>(['store', 'updateById', 'updateStatusById', 'listByUserId']);
        _orderUpdateService = new OrderUpdateService(_orderRepositryStub);
        _order = new OrderBuilder().build();
    });

    it('update record', async () => {
        await _orderUpdateService.run(_order.id, _order);
        expect(_orderRepositryStub.updateById.getCalls().length).toBe(1);
        expect(_orderRepositryStub.updateById.calledWith(_order.id, _order)).toBeTruthy();
    });
});