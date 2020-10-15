import { SinonStubbedInstance } from 'sinon';
import { UserRegisterService } from 'src/domain/user/services/register.service';
import User from 'src/domain/user/user';
import UserRepository from 'src/domain/user/user.respository';
import UserBuilder from 'test/utils/builders/user.builder';
import { createStubObj } from 'test/utils/stubs/creaye-object.stub';


describe('User Resgister Service', () => {

    let _userRegisterService: UserRegisterService;
    let _userRepositoryStub: SinonStubbedInstance<UserRepository>;
    let _user: User;

    beforeEach(() => {

        _userRepositoryStub = createStubObj<UserRepository>(['findByEmail', 'save']);
        _userRegisterService = new UserRegisterService(_userRepositoryStub);
        _user = new UserBuilder().withBirthDate(new Date(2000, 1, 10)).build();
    });

    it('If user email exists, could not create and should return error', async () => {
        _userRepositoryStub.findByEmail.returns(Promise.resolve(_user));
        await expect(
            _userRegisterService.run(_user),
        ).rejects.toThrow(`Email ${_user.email} already`);
    });

    it('If email not exists save user in the repository', async () => {        
        _userRepositoryStub.findByEmail.returns(Promise.resolve(null));
        await _userRegisterService.run(_user);
        expect(_userRepositoryStub.save.getCalls().length).toBe(1);
        expect(_userRepositoryStub.save.calledWith(_user)).toBeTruthy();
    });
});