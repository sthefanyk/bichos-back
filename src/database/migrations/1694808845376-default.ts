import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694808845376 implements MigrationInterface {
    name = 'Default1694808845376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime, "deleted_at" datetime)`);
        await queryRunner.query(`CREATE TABLE "personalities" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime, "deleted_at" datetime)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "personalities"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
