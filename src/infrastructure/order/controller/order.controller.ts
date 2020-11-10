import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request, Response } from "express";
import { OrderRegisterCommand } from "src/application/order/command/register.command";
import { OrderRegisterHandler } from "src/application/order/command/register.handler";
import { OrderListHandler } from "src/application/order/query/order.list.handler";
import { JwtAuthGuard } from "src/infrastructure/security/auth/guards/jwt-auth.guard";

@Controller('orders')
export class OrderController { 
    constructor(
        private readonly _orderRegisterHandler: OrderRegisterHandler,
        private readonly _orderListHandler: OrderListHandler,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async register(
        @Body() orderRegisterCommand: OrderRegisterCommand,
        @Req() request: Request,
        @Res() response: Response
    ) {
        const user: any = request.user;
        await this._orderRegisterHandler.run(orderRegisterCommand, user.userId);
        return response.json({ message: 'Order registered successfully' });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Req() request: Request, @Res() response: Response) {
        const user: any = request.user;
        const list = await this._orderListHandler.run(user.userId);
        return response.json({ data: list });
    }
};