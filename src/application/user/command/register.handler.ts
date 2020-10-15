import { Injectable } from "@nestjs/common";
import { UserRegisterService } from "src/domain/user/services/register.service";
import User from "src/domain/user/user";
import { UserRegisterCommand } from "./register.command";

@Injectable()
export class UserRegisterHandler {
    constructor(private _userRegisterService: UserRegisterService) {}

    async run(userRegisterCommand: UserRegisterCommand) {
        await this._userRegisterService.run(
            new User(
                undefined,
                userRegisterCommand.name,
                userRegisterCommand.email,
                new Date(userRegisterCommand.birthDate),
                userRegisterCommand.password,
            )
        );
    }
}
