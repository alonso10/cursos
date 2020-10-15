import { hashSync } from "bcrypt";
import { AgeUserLess } from "src/domain/user/exceptions/AgeUserLess";
import UserBuilder from "test/utils/builders/user.builder";

describe('User domain', () => {

    it('user invalid birth date', () => {
        return expect(async () => new UserBuilder().withBirthDate(new Date(2005, 10, 12)).build())
            .rejects
            .toStrictEqual(new AgeUserLess('User is too younger'));
    });

    it('user valid', () => {
        const user = new UserBuilder()
            .withBirthDate(new Date(2000, 1, 10))
            .withId(1)
            .build();
        expect(user.id).toEqual(1);
    });

    it('valid user password', () => {
        const password = hashSync('12345678', 12);
        const user = new UserBuilder()
            .withBirthDate(new Date(2000, 1, 10))
            .withPassword(password)
            .build();
        expect(user.validatePassword('12345678')).toBeTruthy();
    });
});