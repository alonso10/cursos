import { Body, Controller, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request, Response } from "express";
import { UserRegisterCommand } from "src/application/user/command/register.command";
import { UserRegisterHandler } from "src/application/user/command/register.handler";
import { AuthService } from "src/infrastructure/security/auth/auth.service";
import { LocalAuthGuard } from "src/infrastructure/security/auth/guards/local-auth.guard";

@Controller('users')
export default class UserController {
    constructor(
        private readonly _userRegisterHandler: UserRegisterHandler,
        private authService: AuthService
    ) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async register(@Body() userRegisterCommand: UserRegisterCommand, @Res() response: Response) {
        await this._userRegisterHandler.run(userRegisterCommand);
        return response.json({ message: 'User registered successfully' });
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() request: Request) {
        return this.authService.login(request.user);
    }

}
