import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { BussinesError } from "./BussinesError";
import { Message } from "./message";

@Catch(BussinesError)
export class FilterBussinesException implements ExceptionFilter {
    
    
    catch(exception: BussinesError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const statusCode = HttpStatus.BAD_REQUEST;

        const message: Message = {
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        };

        return response.status(statusCode).json(message);
    }
}
