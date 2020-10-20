import { date } from "faker";
import { Order, StatusOrder } from "src/domain/order/order";

export class OrderBuilder {    
    private id: number;
    private userId: number;
    private courseId: number;
    private dateBuy: Date;
    private status: number;

    constructor() {
        this.id = Math.floor(Math.random() * 100);
        this.userId = Math.floor(Math.random() * 100);
        this.courseId = Math.floor(Math.random() * 100);
        this.dateBuy = date.past();
        this.status = StatusOrder.inactive;
    }

    public wihtId(id: number): OrderBuilder {
        this.id = id;
        return this;
    }

    public withUserId(userId: number): OrderBuilder {
        this.userId = userId;
        return this;
    }

    public withCourseId(courseId: number): OrderBuilder {
        this.courseId = courseId;
        return this;
    }

    public withDateBuy(dateBuy: Date): OrderBuilder {
        this.dateBuy = dateBuy;
        return this;
    }

    public withStatus(status: number): OrderBuilder {
        this.status = status;
        return this;
    }

    public build(): Order {
        return new Order(
            this.id,
            this.userId,
            this.courseId,
            this.dateBuy,
            this.status
        );
    }
}