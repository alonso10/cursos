import { BussinesError } from "src/infrastructure/exceptions/BussinesError";

export class UserAlreadyExists extends BussinesError {
    constructor(message: string) {
        super(message, UserAlreadyExists.name);
    }
}