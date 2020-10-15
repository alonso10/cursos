import { IsString, IsDateString, IsEmail, MinLength, MaxLength } from "class-validator";

export class UserRegisterCommand {
    
    @IsString()
    public name: string;

    @IsEmail()
    public email: string;

    @IsDateString()
    public birthDate: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    public password: string;
}
