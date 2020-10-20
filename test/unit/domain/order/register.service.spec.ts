import { SinonStubbedInstance } from "sinon";
import { Order } from "src/domain/order/order";
import { OrderRepository } from "src/domain/order/order.repository";
import { OrderRegisterService } from "src/domain/order/services/register.service";
import { OrderBuilder } from "test/utils/builders/order.builder";
import { createStubObj } from "test/utils/stubs/creaye-object.stub";

describe('Order register service', () => { 
    let _orderRegisterService: OrderRegisterService;
    let _orderRepositryStub: SinonStubbedInstance<OrderRepository>;
    let _order: Order;

    beforeEach(() => {
        _orderRepositryStub = createStubObj<OrderRepository>(['store', 'updateById', 'updateStatusById', 'listByUserId']);
        _orderRegisterService = new OrderRegisterService(_orderRepositryStub);
        _order = new OrderBuilder().build();
    });

    it('Register new record', async () => {
        await _orderRegisterService.run(_order);
        expect(_orderRepositryStub.store.getCalls().length).toBe(1);
        expect(_orderRepositryStub.store.calledWith(_order)).toBeTruthy();
    });
});