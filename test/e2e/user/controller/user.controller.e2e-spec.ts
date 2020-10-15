import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { name, internet, random } from "faker";
import { UserRegisterCommand } from 'src/application/user/command/register.command';
import { UserRegisterHandler } from 'src/application/user/command/register.handler';
import { UserRegisterService } from 'src/domain/user/services/register.service';
import UserRepository from 'src/domain/user/user.respository';
import { FilterBussinesException } from 'src/infrastructure/exceptions/FilterBussinesException';
import UserController from 'src/infrastructure/user/controller/user.controller';
import { userRegisterServiceProvider } from 'src/infrastructure/user/provider/service/register.service.provider';
import { createStubObj } from 'test/utils/stubs/creaye-object.stub';
import { AuthService } from 'src/infrastructure/security/auth/auth.service';
import { LocalStrategy } from 'src/infrastructure/security/auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import UserBuilder from 'test/utils/builders/user.builder';

const sinonSandbox = createSandbox();

describe('Testing user controller', () => {

    let app: INestApplication;    
    let userRepository: SinonStubbedInstance<UserRepository>;
    let authService: SinonStubbedInstance<AuthService>;

    beforeAll(async () => {
        userRepository = createStubObj<UserRepository>(['findByEmail', 'save'], sinonSandbox);
        authService = createStubObj<AuthService>(['login', 'validateUser'], sinonSandbox);
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserRegisterService,
                    inject: [UserRepository],
                    useFactory: userRegisterServiceProvider,
                },
                { provide: UserRepository, useValue: userRepository },
                UserRegisterHandler,
                { provide: AuthService, useValue: authService },
                LocalStrategy,
            ],
            imports: [PassportModule]
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalFilters(new FilterBussinesException());
        await app.init();
    });

    afterEach(() => {
        sinonSandbox.restore();
    });

    afterAll(async () => {
        await app.close();
    });

    
    it('should throw exception `User is too younger`', async () => {        
        const userRegisterCommand: UserRegisterCommand = {
            name: name.findName(),
            email: internet.email(),
            birthDate: new Date(2005, 1, 10).toISOString(),
            password: random.alphaNumeric(10),
        }
        const message = 'User is too younger';

        const response = await request(app.getHttpServer())
            .post('/users').send(userRegisterCommand)
            .expect(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toBe(message);
        expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should create user successfully', async () => {        
        const userRegisterCommand: UserRegisterCommand = {
            name: name.findName(),
            email: internet.email(),
            birthDate: new Date(2000, 1, 10).toISOString(),
            password: random.alphaNumeric(10),
        }
        const message = 'User registered successfully';

        const response = await request(app.getHttpServer())
            .post('/users').send(userRegisterCommand)
            .expect(HttpStatus.CREATED);
        expect(response.body.message).toBe(message);        
    });

    it('should return access token', async () => {
        const body = {
            email: internet.email(),
            password: random.alphaNumeric(10),
        }
        const user = new UserBuilder().withBirthDate(new Date(2000, 10, 10)).build();
        authService.login.returns(Promise.resolve({ accessToken: '123456789' }));
        authService.validateUser.returns(Promise.resolve(user));
        const response = await request(app.getHttpServer())
            .post('/users/auth/login').send(body)
            .expect(HttpStatus.CREATED);
        expect(response.body).toEqual({ accessToken: '123456789' });        
    });

    it('should return unauthorized errror', async () => {
        const body = {
            email: internet.email(),
            password: random.alphaNumeric(10),
        }
        authService.validateUser.returns(Promise.resolve(null));
        const response = await request(app.getHttpServer())
            .post('/users/auth/login').send(body)
            .expect(HttpStatus.UNAUTHORIZED);
        expect(response.body.message).toBe('Unauthorized');        
    });
    
});