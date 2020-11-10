import { StatusOrder } from "src/domain/order/order";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders")
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    courseId: number;

    @Column()
    dateBuy: Date;

    @Column()
    status: StatusOrder
}
