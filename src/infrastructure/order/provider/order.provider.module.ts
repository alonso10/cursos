import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRegisterHandler } from "src/application/order/command/register.handler";
import { OrderListHandler } from "src/application/order/query/order.list.handler";
import { OrderDao } from "src/domain/order/order.dao";
import { OrderRepository } from "src/domain/order/order.repository";
import { OrderRegisterService } from "src/domain/order/services/register.service";
import { CourseEntity } from "src/infrastructure/course/entity/course.entity";
import { courseRepositoryProvider } from "src/infrastructure/course/provider/repository/course.repository.provider";
import { OrderEntity } from "../entity/order.entity";
import { orderDaoProvider } from "./dao/order.dao.provider";
import { orderRepositoryProvider } from "./repository/order.respository.provider";
import { orderRegisterServiceProvider } from "./services/register.service.provider";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, CourseEntity])],
    providers: [
        {
            provide: OrderRegisterService,
            inject: [OrderRepository],
            useFactory: orderRegisterServiceProvider,
        },
        orderRepositoryProvider,
        orderDaoProvider,
        courseRepositoryProvider,
        OrderRegisterHandler,
        OrderListHandler,
    ],
    exports: [
        OrderRepository,
        OrderDao,
        OrderRegisterService,
        OrderRegisterHandler,
        OrderListHandler,
    ]
})
export class OrderProviderModule { }
