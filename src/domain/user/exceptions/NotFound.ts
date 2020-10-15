import { BussinesError } from "src/infrastructure/exceptions/BussinesError";

export class UserNotFound extends BussinesError {
    constructor(message: string) {
        super(message, UserNotFound.name);
    }
}