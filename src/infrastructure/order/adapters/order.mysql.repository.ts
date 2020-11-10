import { InjectRepository } from "@nestjs/typeorm";
import { Nullable } from "src/domain/Nullable";
import { Order } from "src/domain/order/order";
import { OrderRepository } from "src/domain/order/order.repository";
import { Repository } from "typeorm";
import { OrderEntity } from "../entity/order.entity";

export class OrderMysqlRepository implements OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private repository: Repository<OrderEntity>
    ) { }
    
    async fetchByName(name: string): Promise<Nullable<Order>> {
        const orderFounded = await this.repository.findOne({ where: { name } });
        if (orderFounded) {
            return new Order(
                orderFounded.id,
                orderFounded.userId,
                orderFounded.courseId,
                orderFounded.dateBuy                
            );
        }
        return null;
    }

    async store(order: Order): Promise<void> {
        await this.repository.save(order);
    }
    
    async updateStatusById(id: number, status: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}