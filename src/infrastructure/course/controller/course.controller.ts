import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { CourseListHandler } from "src/application/course/query/course.list.handler";
import { JwtAuthGuard } from "src/infrastructure/security/auth/guards/jwt-auth.guard";


@Controller('courses')
export class CourseController {
    constructor(
        private readonly _courseListHandler: CourseListHandler,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Res() response: Response) {
        const listCourses = await this._courseListHandler.run();
        return response.json({ data: listCourses });
    }
}