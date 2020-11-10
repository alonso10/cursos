import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfigFactory } from "./configuration/database.config";
import { NodeEnv } from "./configuration/environment/env-node.enum";
import { CourseModule } from "./course/course.module";
import { OrderModule } from "./order/order.module";
import { AuthModule } from "./security/auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
    providers: [],
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: databaseConfigFactory,
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `env/${process.env.NODE_ENV}.env`,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
                    .required(),
            }),
        }),
        AuthModule,
        UserModule,
        CourseModule,
        OrderModule,
    ],
})
export class InfrastructureModule { }
