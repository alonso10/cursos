import { BussinesError } from "src/infrastructure/exceptions/BussinesError";

export class AgeUserLess extends BussinesError {
    constructor(message: string) {
        super(message, AgeUserLess.name);
    }
}