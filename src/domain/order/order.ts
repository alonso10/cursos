export enum StatusOrder {
    active,
    inactive,
    cancel
};

export class Order {
    readonly id: number;
    readonly userId: number;
    readonly courseId: number;
    readonly dateBuy: Date;
    readonly status: number;

    constructor(
        id: number,
        userId: number,
        courseId: number,
        dateBuy: Date,
        status: number,
    ) {
        this.id = id;
        this.userId = userId;
        this.courseId = courseId;
        this.dateBuy = dateBuy;
        this.status = status;
    }

    public isActive(): boolean {
        const currentDate = new Date();
        const difference = currentDate.getTime() - this.dateBuy.getTime();
        const days = difference / (1000 * 3600 * 24);
        return days >= 1;
    }
}