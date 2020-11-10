import { Injectable } from "@nestjs/common";
import { CourseRepository } from "src/domain/course/course.repository";
import { Order } from "src/domain/order/order";
import { OrderRegisterService } from "src/domain/order/services/register.service";
import { OrderRegisterCommand } from "./register.command";

@Injectable()
export class OrderRegisterHandler {
    constructor(
        private _courseRepository: CourseRepository,
        private _orderRegisterService: OrderRegisterService
    ) { }

    async run(orderRegisterCommand: OrderRegisterCommand, userId: number) {
        const course = await this._courseRepository.findByName(orderRegisterCommand.courseName);

        await this._orderRegisterService.run(
            new Order(
                undefined,
                userId,
                course.id,
                new Date(orderRegisterCommand.dateBuy),
            )
        );
    }
}