import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1695684186937 implements MigrationInterface {
    name = 'Init1695684186937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state" ("name" varchar(45) PRIMARY KEY NOT NULL, "abbreviation" varchar(2) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "city" ("name" varchar(45) PRIMARY KEY NOT NULL, "state_name" varchar(45))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "full_name" varchar NOT NULL, "username" varchar(16) NOT NULL, "description" text NOT NULL DEFAULT (''), "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT (1), "created_at" datetime NOT NULL, "updated_at" datetime, "deleted_at" datetime, "city_name" varchar(45), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "person" ("id" varchar PRIMARY KEY NOT NULL, "cpf" varchar(11) NOT NULL, "date_birth" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_264b7cad2330569e0ef5b4c39c4" UNIQUE ("cpf"), CONSTRAINT "REL_5157fa65538cae06e66c922c89" UNIQUE ("user_id"), CONSTRAINT "REL_e08f75ffbab3620fc9746ee878" UNIQUE ("user"))`);
        await queryRunner.query(`CREATE TABLE "shelter" ("id" varchar PRIMARY KEY NOT NULL, "responsible_cpf" varchar(11) NOT NULL, "responsible_date_birth" date NOT NULL, "name_shelter" varchar NOT NULL, "star_date_shelter" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_ca7499ae2ae41a67e488e8cd18c" UNIQUE ("responsible_cpf"), CONSTRAINT "REL_6b37a09b857e638e3200dcc995" UNIQUE ("user_id"), CONSTRAINT "REL_4174333359fe477e96b2929f1a" UNIQUE ("user"))`);
        await queryRunner.query(`CREATE TABLE "personalities" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime, "deleted_at" datetime)`);
        await queryRunner.query(`CREATE TABLE "temporary_city" ("name" varchar(45) PRIMARY KEY NOT NULL, "state_name" varchar(45), CONSTRAINT "FK_5ed5331a309d2f6ca5bf4767ac1" FOREIGN KEY ("state_name") REFERENCES "state" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_city"("name", "state_name") SELECT "name", "state_name" FROM "city"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`ALTER TABLE "temporary_city" RENAME TO "city"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "full_name" varchar NOT NULL, "username" varchar(16) NOT NULL, "description" text NOT NULL DEFAULT (''), "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT (1), "created_at" datetime NOT NULL, "updated_at" datetime, "deleted_at" datetime, "city_name" varchar(45), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "FK_a633d4ffb0563912c7b391fa967" FOREIGN KEY ("city_name") REFERENCES "city" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "full_name", "username", "description", "email", "password", "role", "created_at", "updated_at", "deleted_at", "city_name") SELECT "id", "full_name", "username", "description", "email", "password", "role", "created_at", "updated_at", "deleted_at", "city_name" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_person" ("id" varchar PRIMARY KEY NOT NULL, "cpf" varchar(11) NOT NULL, "date_birth" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_264b7cad2330569e0ef5b4c39c4" UNIQUE ("cpf"), CONSTRAINT "REL_5157fa65538cae06e66c922c89" UNIQUE ("user_id"), CONSTRAINT "REL_e08f75ffbab3620fc9746ee878" UNIQUE ("user"), CONSTRAINT "FK_5157fa65538cae06e66c922c898" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e08f75ffbab3620fc9746ee8789" FOREIGN KEY ("user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_person"("id", "cpf", "date_birth", "user_id", "user") SELECT "id", "cpf", "date_birth", "user_id", "user" FROM "person"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`ALTER TABLE "temporary_person" RENAME TO "person"`);
        await queryRunner.query(`CREATE TABLE "temporary_shelter" ("id" varchar PRIMARY KEY NOT NULL, "responsible_cpf" varchar(11) NOT NULL, "responsible_date_birth" date NOT NULL, "name_shelter" varchar NOT NULL, "star_date_shelter" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_ca7499ae2ae41a67e488e8cd18c" UNIQUE ("responsible_cpf"), CONSTRAINT "REL_6b37a09b857e638e3200dcc995" UNIQUE ("user_id"), CONSTRAINT "REL_4174333359fe477e96b2929f1a" UNIQUE ("user"), CONSTRAINT "FK_6b37a09b857e638e3200dcc995d" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4174333359fe477e96b2929f1ab" FOREIGN KEY ("user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_shelter"("id", "responsible_cpf", "responsible_date_birth", "name_shelter", "star_date_shelter", "user_id", "user") SELECT "id", "responsible_cpf", "responsible_date_birth", "name_shelter", "star_date_shelter", "user_id", "user" FROM "shelter"`);
        await queryRunner.query(`DROP TABLE "shelter"`);
        await queryRunner.query(`ALTER TABLE "temporary_shelter" RENAME TO "shelter"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shelter" RENAME TO "temporary_shelter"`);
        await queryRunner.query(`CREATE TABLE "shelter" ("id" varchar PRIMARY KEY NOT NULL, "responsible_cpf" varchar(11) NOT NULL, "responsible_date_birth" date NOT NULL, "name_shelter" varchar NOT NULL, "star_date_shelter" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_ca7499ae2ae41a67e488e8cd18c" UNIQUE ("responsible_cpf"), CONSTRAINT "REL_6b37a09b857e638e3200dcc995" UNIQUE ("user_id"), CONSTRAINT "REL_4174333359fe477e96b2929f1a" UNIQUE ("user"))`);
        await queryRunner.query(`INSERT INTO "shelter"("id", "responsible_cpf", "responsible_date_birth", "name_shelter", "star_date_shelter", "user_id", "user") SELECT "id", "responsible_cpf", "responsible_date_birth", "name_shelter", "star_date_shelter", "user_id", "user" FROM "temporary_shelter"`);
        await queryRunner.query(`DROP TABLE "temporary_shelter"`);
        await queryRunner.query(`ALTER TABLE "person" RENAME TO "temporary_person"`);
        await queryRunner.query(`CREATE TABLE "person" ("id" varchar PRIMARY KEY NOT NULL, "cpf" varchar(11) NOT NULL, "date_birth" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_264b7cad2330569e0ef5b4c39c4" UNIQUE ("cpf"), CONSTRAINT "REL_5157fa65538cae06e66c922c89" UNIQUE ("user_id"), CONSTRAINT "REL_e08f75ffbab3620fc9746ee878" UNIQUE ("user"))`);
        await queryRunner.query(`INSERT INTO "person"("id", "cpf", "date_birth", "user_id", "user") SELECT "id", "cpf", "date_birth", "user_id", "user" FROM "temporary_person"`);
        await queryRunner.query(`DROP TABLE "temporary_person"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "full_name" varchar NOT NULL, "username" varchar(16) NOT NULL, "description" text NOT NULL DEFAULT (''), "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT (1), "created_at" datetime NOT NULL, "updated_at" datetime, "deleted_at" datetime, "city_name" varchar(45), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "full_name", "username", "description", "email", "password", "role", "created_at", "updated_at", "deleted_at", "city_name") SELECT "id", "full_name", "username", "description", "email", "password", "role", "created_at", "updated_at", "deleted_at", "city_name" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "city" RENAME TO "temporary_city"`);
        await queryRunner.query(`CREATE TABLE "city" ("name" varchar(45) PRIMARY KEY NOT NULL, "state_name" varchar(45))`);
        await queryRunner.query(`INSERT INTO "city"("name", "state_name") SELECT "name", "state_name" FROM "temporary_city"`);
        await queryRunner.query(`DROP TABLE "temporary_city"`);
        await queryRunner.query(`DROP TABLE "personalities"`);
        await queryRunner.query(`DROP TABLE "shelter"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "state"`);
    }

}
