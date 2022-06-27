import { SqlReader } from "node-sql-reader";
import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1652800321507 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const folder = __dirname;
        const path = folder + '/initial-schema.sql';
        let queries = SqlReader.readSqlFile(path);
        for (let query of queries) {
            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
// import {MigrationInterface, QueryRunner} from "typeorm";

// export class InitialSchema1652800321507 implements MigrationInterface {
//     name = 'InitialSchema1652800321507'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL,\`car_make\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`mechanics\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`mechanic_name\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(50) NOT NULL, \`address\` varchar(50) NOT NULL,\`description\` varchar(200) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`appointments\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`customer_id\` bigint NOT NULL, \`mechanic_id\` bigint NOT NULL, \`status\` varchar(50) NOT NULL, \`type\` varchar(50) NOT NULL,\`date\` varchar(200) NOT NULL, \`amount\` decimal(19,4) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`DROP TABLE \`customers\``);
//         await queryRunner.query(`DROP TABLE \`mechanics\``);
//         await queryRunner.query(`DROP TABLE \`appointments\``);
//     }

// }