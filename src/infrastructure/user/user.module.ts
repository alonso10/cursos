import { Module } from "@nestjs/common";
import UserController from "./controller/user.controller";
import { UserProviderModule } from "./provider/user.provider.module";

@Module({
    imports: [UserProviderModule],
    controllers: [UserController]
})
export class UserModule {}