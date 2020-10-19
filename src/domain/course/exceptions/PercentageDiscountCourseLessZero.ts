import { BussinesError } from "src/infrastructure/exceptions/BussinesError";

export class PercentageDiscountCourseLessZero extends BussinesError {
    constructor(message: string) {
        super(message, PercentageDiscountCourseLessZero.name);
    }
}
