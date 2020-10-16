export class Course {
    readonly id: number;
    readonly name: string;
    readonly duration: number;
    readonly price: number;


    constructor(id: number, name: string, duration: number, price: number) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.price = price;
    }
    
    public getDiscount(percentage: number) {
        return (this.price * percentage) / 100;
    }
}