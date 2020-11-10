import { IsDateString, IsString } from "class-validator";

export class OrderRegisterCommand {
    
    @IsString()
    public courseName: string;

    @IsDateString()
    public dateBuy: string;
}