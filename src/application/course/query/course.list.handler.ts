import { Injectable } from "@nestjs/common";
import { CourseRepository } from "src/domain/course/course.repository";
import { CourseDto } from "./course.dto";

@Injectable()
export class CourseListHandler {
    constructor(private courseRepository: CourseRepository) { }
    
    async run(): Promise<CourseDto[]> {
        const listCourses = await this.courseRepository.findAll();
        return listCourses.map(course => ({ name: course.name, duration: course.duration, price: course.price }));
    }
}
