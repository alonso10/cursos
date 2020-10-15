import UserRepository from "src/domain/user/user.respository";
import { UserMysqlRepository } from "src/infrastructure/user/adapter/user.mysql.repository";

export const userRepositoryProvider = {
    provide: UserRepository,
    useClass: UserMysqlRepository,
};
