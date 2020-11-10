import { InjectEntityManager } from "@nestjs/typeorm";
import { OrderDto } from "src/application/order/query/dto/order.dto";
import { StatusOrder } from "src/domain/order/order";
import { OrderDao } from "src/domain/order/order.dao";
import { EntityManager } from "typeorm";

export class OrderMysqlDao implements OrderDao {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) { }

    async listByUser(userId: number): Promise<OrderDto[]> {
        const coursesByUser = await this.entityManager.query(
            'select * from orders o join users u on u.id = o.userId join courses c on c.id = o.courseId where u.id = ?',
            [userId]
        );
        return coursesByUser.map((item: any) => {            
            const dataOrders: OrderDto = {
                userId: item.userId,
                courseId: item.courseId,
                dateBuy: item.dateBuy,
                active: this.isActive(item.dateBuy),
                courseName: item.name,
                canceled: StatusOrder[item.status] === 'cancel',
                courseDuration: item.duration,
            }
            return dataOrders;
        });
    }

    private isActive(dateBuy: Date): boolean {
        const currentDate = new Date();
        const difference = currentDate.getTime() - dateBuy.getTime();
        const days = difference / (1000 * 3600 * 24);
        return days >= 1;
    }
}
