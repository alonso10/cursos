export class OrderDto { 
    public userId: number;
    public courseId: number;
    public courseName: string;
    public courseDuration: number;    
    public dateBuy: string;
    public active: boolean;
    public canceled: boolean;
}