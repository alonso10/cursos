import { Nullable } from "../Nullable";
import { Course } from "./course";

export abstract class CourseRepository {
    abstract async findAll(): Promise<Course[]>
    abstract async findById(id: number): Promise<Nullable<Course>>;
    abstract async findByName(name: string): Promise<Nullable<Course>>;
}