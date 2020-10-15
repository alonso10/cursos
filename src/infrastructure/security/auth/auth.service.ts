import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Nullable } from "src/domain/Nullable";
import User from "src/domain/user/user";
import UserRepository from "src/domain/user/user.respository";

@Injectable()
export class AuthService {
    constructor(
        private _userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<Nullable<User>> {
        const user = await this._userRepository.findByEmail(email);
        if (user && user.validatePassword(password)) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}