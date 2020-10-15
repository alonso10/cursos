export class BussinesError extends Error {
    constructor(message: string, classError?: string) {
        super(message);
        this.name = classError || BussinesError.name;
    }
}