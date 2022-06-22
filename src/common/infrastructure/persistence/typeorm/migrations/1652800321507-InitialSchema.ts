import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1652800321507 implements MigrationInterface {
    name = 'InitialSchema1652800321507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL,\`car_make\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mechanics\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`mechanic_name\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(50) NOT NULL, \`address\` varchar(50) NOT NULL,\`description\` varchar(200) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP TABLE \`mechanics\``);
    }

}