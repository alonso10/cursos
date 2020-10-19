import { Course } from "src/domain/course/course";
import { PercentageDiscountCourseLessZero } from "src/domain/course/exceptions/PercentageDiscountCourseLessZero";

describe('test course domain', () => { 
    it('course error percentage discount less zero', () => {
        return expect(async () => new Course(1, 'Basic PHP', 8, 35000).getDiscount(-2))
            .rejects
            .toStrictEqual(new PercentageDiscountCourseLessZero('The percentage discount should be more than zero'));
    });

    it('course get discount', () => { 
        const course = new Course(1, 'Basic PHP', 8, 35000);
        expect(course.getDiscount(10)).toBe(3500);
    });
});