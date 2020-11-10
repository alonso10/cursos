import { Module } from "@nestjs/common";
import { OrderController } from "./controller/order.controller";
import { OrderProviderModule } from "./provider/order.provider.module";

@Module({
    imports: [OrderProviderModule],
    controllers: [OrderController]
})
export class OrderModule { }
