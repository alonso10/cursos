import {MigrationInterface, QueryRunner} from "typeorm";

export class OrdersTable1603305132233 implements MigrationInterface {
    name = 'OrdersTable1603305132233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `orders` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `courseId` int NOT NULL, `dateBuy` datetime NOT NULL, `status` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `orders`");
    }

}
