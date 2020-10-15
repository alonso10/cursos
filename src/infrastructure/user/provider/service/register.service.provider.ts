import { UserRegisterService } from "src/domain/user/services/register.service";
import UserRepository from "src/domain/user/user.respository";

export function userRegisterServiceProvider(userRepository: UserRepository): UserRegisterService {
    return new UserRegisterService(userRepository);
}
