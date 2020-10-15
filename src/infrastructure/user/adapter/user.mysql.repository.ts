import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Nullable } from "src/domain/Nullable";
import User from "src/domain/user/user";
import UserRepository from "src/domain/user/user.respository";
import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";


@Injectable()
export class UserMysqlRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) { }

    async findByEmail(email: string): Promise<Nullable<User>> {
        const userFinded = await this.repository.findOne({ where: { email } });
        if (userFinded) {
            return new User(
                userFinded.id,
                userFinded.name,
                userFinded.email,
                userFinded.birthDate,
                userFinded.password,
            );
        }

        return null;
    }

    async save(user: User): Promise<void> {
        const entity = new UserEntity();
        entity.name = user.name;
        entity.email = user.email;
        entity.birthDate = user.birthDate;
        entity.password = user.password;
        await this.repository.save(entity);
    }
}
