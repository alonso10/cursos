import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/domain/course/course";
import { CourseRepository } from "src/domain/course/course.repository";
import { Nullable } from "src/domain/Nullable";
import { Repository } from "typeorm";
import { CourseEntity } from "../entity/course.entity";

@Injectable()
export class CourseMysqlRepository implements CourseRepository {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly repository: Repository<CourseEntity>
    ) { }

    async findAll(): Promise<Course[]> {
        const listCourseEntity = await this.repository.find();
        return listCourseEntity.map(course => new Course(course.id, course.name, course.duration, course.price));
    }

    async findById(id: number): Promise<Nullable<Course>> {
        const courseEntity = await this.repository.findOne(id);
        if (courseEntity) {
            return new Course(courseEntity.id, courseEntity.name, courseEntity.duration, courseEntity.price);
        }
        return null;
    }

    async findByName(name: string): Promise<Nullable<Course>> {
        const courseEntity = await this.repository.findOne({ where: { name } });
        if (courseEntity) {
            return new Course(courseEntity.id, courseEntity.name, courseEntity.duration, courseEntity.price);
        }
        return null;
    }
}
