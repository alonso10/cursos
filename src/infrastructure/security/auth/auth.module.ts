import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserProviderModule } from "src/infrastructure/user/provider/user.provider.module";
import { AuthService } from "./auth.service";
import { jwtContanst } from "./contants";
import { LocalStrategy } from "./strategies/local.strategy";

@Global()
@Module({
    imports: [
        UserProviderModule,
        PassportModule,
        JwtModule.register({
            secret: jwtContanst.secret,
            signOptions: {
                expiresIn: '24h'
            },
        }),
    ],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule { }