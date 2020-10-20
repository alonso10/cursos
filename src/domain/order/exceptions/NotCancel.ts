import { BussinesError } from "src/infrastructure/exceptions/BussinesError";

export class NotCancelException extends BussinesError {
    constructor(message: string) {
        super(message, NotCancelException.name);
    }
}
