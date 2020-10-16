import { Module } from "@nestjs/common";
import { CourseController } from "./controller/course.controller";
import { CourseProviderModule } from "./provider/course.provider.module";

@Module({
    imports: [CourseProviderModule],
    controllers: [CourseController],
})
export class CourseModule { }
