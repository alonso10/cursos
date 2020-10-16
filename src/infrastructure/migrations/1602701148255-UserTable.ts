import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1602701148255 implements MigrationInterface {
    name = 'UserTable1602701148255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `password` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `password`");
    }

}
