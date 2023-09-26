import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPicturesPathInUserTable1695728219094 implements MigrationInterface {
    name = 'AddPicturesPathInUserTable1695728219094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "full_name" varchar NOT NULL, "username" varchar(16) NOT NULL, "description" text NOT NULL DEFAULT (''), "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT (1), "created_at" datetime NOT NULL, "updated_at" datetime, "deleted_at" datetime, "city_name" varchar(45), "profile_picture" varchar NOT NULL DEFAULT (''), "header_picture" varchar NOT NULL DEFAULT (''), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "FK_a633d4ffb0563912c7b391fa967" FOREIGN KEY ("city_name") REFERENCES "city" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "full_name", "username", "description", "email", "password", "role", "created_at", "updated_at", "deleted_at", "city_name") SELECT "id", "full_name", "username", "description", "email", "password", "role", "created_at", "updated_at", "deleted_at", "city_name" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "full_name" varchar NOT NULL, "username" varchar(16) NOT NULL, "description" text NOT NULL DEFAULT (''), "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT (1), "created_at" datetime NOT NULL, "updated_at" datetime, "deleted_at" datetime, "city_name" varchar(45), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "FK_a633d4ffb0563912c7b391fa967" FOREIGN KEY ("city_name") REFERENCES "city" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user"("id", "full_name", "username", "description", "email", "password", "role", "created_at", "updated_at", "deleted_at", "city_name") SELECT "id", "full_name", "username", "description", "email", "password", "role", "created_at", "updated_at", "deleted_at", "city_name" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
