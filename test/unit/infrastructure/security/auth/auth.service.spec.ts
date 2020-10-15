import { JwtService } from "@nestjs/jwt";
import { hashSync } from "bcrypt";
import { SinonStubbedInstance } from "sinon";
import User from "src/domain/user/user";
import UserRepository from "src/domain/user/user.respository";
import { AuthService } from "src/infrastructure/security/auth/auth.service";
import UserBuilder from "test/utils/builders/user.builder";
import { createStubObj } from "test/utils/stubs/creaye-object.stub";

describe('User Resgister Service', () => {

    let _authService: AuthService;
    let _userRepositoryStub: SinonStubbedInstance<UserRepository>;
    let _jwtService: JwtService;
    let _user: User;

    beforeEach(() => {
        _userRepositoryStub = createStubObj<UserRepository>(['findByEmail', 'save']);
        _jwtService = new JwtService({secret: '12345678'});
        _authService = new AuthService(_userRepositoryStub, _jwtService);        
    });

    it('Validate user exists', async () => {
        const password = hashSync('12345678', 12);
        _user = new UserBuilder()            
            .withBirthDate(new Date(2000, 1, 10))
            .withPassword(password)
            .build();
        _userRepositoryStub.findByEmail.returns(Promise.resolve(_user));
        expect(await _authService.validateUser('test@test.test', '12345678')).toBe(_user);
    });

    it('Validate user not exists', async () => {
        _userRepositoryStub.findByEmail.returns(Promise.resolve(null));
        expect(await _authService.validateUser('test@test.test', '12345678')).toBe(null);
    });

    it('login function', async () => {        
        const token = await _authService.login({ email: 'test@test.test', sub: 1 });
        expect(token).toHaveProperty('accessToken');
    });
});