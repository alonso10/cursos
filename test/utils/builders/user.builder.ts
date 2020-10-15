import { name, internet, date, random } from "faker";
import User from "src/domain/user/user";

export default class UserBuilder {
    private id: number;
    private name: string;
    private email: string;
    private birthDate: Date;
    private password: string;

    constructor() {
        this.id = Math.floor(Math.random() * 100);
        this.name = name.findName();
        this.email = internet.email();
        this.birthDate = date.past();
        this.password = random.alphaNumeric()
    }

    public withId(id: number): UserBuilder {
        this.id = id;
        return this;
    }

    public withName(name: string): UserBuilder {
        this.name = name;
        return this;
    }

    public withEmail(email: string): UserBuilder {
        this.email = email;
        return this;
    }

    public withBirthDate(birthDate: Date): UserBuilder {
        this.birthDate = birthDate;
        return this;
    }

    public withPassword(password: string): UserBuilder {
        this.password = password;
        return this;
    }

    public build(): User {
        return new User(this.id, this.name, this.email, this.birthDate, this.password);
    }

}