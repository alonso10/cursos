import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('courses')
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    duration: number;

    @Column()
    price: number;

}