import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseTable1602821380363 implements MigrationInterface {
    name = 'CourseTable1602821380363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `courses` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `duration` int NOT NULL, `price` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `courses`");
    }

}
