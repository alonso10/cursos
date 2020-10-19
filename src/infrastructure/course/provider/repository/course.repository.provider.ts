import { CourseRepository } from "src/domain/course/course.repository";
import { CourseMysqlRepository } from "src/infrastructure/course/adapter/course.mysql.repository";

export const courseRepositoryProvider = {
    provide: CourseRepository,
    useClass: CourseMysqlRepository,
};
