import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseListHandler } from "src/application/course/query/course.list.handler";
import { CourseRepository } from "src/domain/course/course.repository";
import { CourseEntity } from "../entity/course.entity";
import { courseRepositoryProvider } from "./repository/course.repository.provicer";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity])],
    providers: [
        courseRepositoryProvider,
        CourseListHandler,
    ],
    exports: [
        CourseListHandler,
        CourseRepository,
    ]
})
export class CourseProviderModule {}
