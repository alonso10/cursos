import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRegisterHandler } from 'src/application/user/command/register.handler';
import { UserRegisterService } from 'src/domain/user/services/register.service';
import UserRepository from 'src/domain/user/user.respository';
import { UserEntity } from "../entity/user.entity";
import { userRepositoryProvider } from './repository/user.repository.provider';
import { userRegisterServiceProvider } from './service/register.service.provider';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        { 
            provide: UserRegisterService, 
            inject: [UserRepository], 
            useFactory: userRegisterServiceProvider 
        },
        userRepositoryProvider,
        UserRegisterHandler,
    ],
    exports: [
        UserRepository,
        UserRegisterService,
        UserRegisterHandler
    ]
})
export class UserProviderModule {}