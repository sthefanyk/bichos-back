import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTableNgo1695739954257 implements MigrationInterface {
    name = 'NewTableNgo1695739954257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ngo" ("id" varchar PRIMARY KEY NOT NULL, "cnpj" varchar(14) NOT NULL, "name_ngo" varchar(45) NOT NULL, "date_register" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_3a730f37d3013bf3f184a20111e" UNIQUE ("cnpj"), CONSTRAINT "UQ_9182da7b6904c65042d60ead3f4" UNIQUE ("name_ngo"), CONSTRAINT "REL_e7225cd89f80ae8237a312726e" UNIQUE ("user_id"), CONSTRAINT "REL_32edca82504143adb7a8bda1c3" UNIQUE ("user"))`);
        await queryRunner.query(`CREATE TABLE "temporary_ngo" ("id" varchar PRIMARY KEY NOT NULL, "cnpj" varchar(14) NOT NULL, "name_ngo" varchar(45) NOT NULL, "date_register" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_3a730f37d3013bf3f184a20111e" UNIQUE ("cnpj"), CONSTRAINT "UQ_9182da7b6904c65042d60ead3f4" UNIQUE ("name_ngo"), CONSTRAINT "REL_e7225cd89f80ae8237a312726e" UNIQUE ("user_id"), CONSTRAINT "REL_32edca82504143adb7a8bda1c3" UNIQUE ("user"), CONSTRAINT "FK_e7225cd89f80ae8237a312726e9" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_32edca82504143adb7a8bda1c37" FOREIGN KEY ("user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ngo"("id", "cnpj", "name_ngo", "date_register", "user_id", "user") SELECT "id", "cnpj", "name_ngo", "date_register", "user_id", "user" FROM "ngo"`);
        await queryRunner.query(`DROP TABLE "ngo"`);
        await queryRunner.query(`ALTER TABLE "temporary_ngo" RENAME TO "ngo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ngo" RENAME TO "temporary_ngo"`);
        await queryRunner.query(`CREATE TABLE "ngo" ("id" varchar PRIMARY KEY NOT NULL, "cnpj" varchar(14) NOT NULL, "name_ngo" varchar(45) NOT NULL, "date_register" date NOT NULL, "user_id" varchar, "user" varchar, CONSTRAINT "UQ_3a730f37d3013bf3f184a20111e" UNIQUE ("cnpj"), CONSTRAINT "UQ_9182da7b6904c65042d60ead3f4" UNIQUE ("name_ngo"), CONSTRAINT "REL_e7225cd89f80ae8237a312726e" UNIQUE ("user_id"), CONSTRAINT "REL_32edca82504143adb7a8bda1c3" UNIQUE ("user"))`);
        await queryRunner.query(`INSERT INTO "ngo"("id", "cnpj", "name_ngo", "date_register", "user_id", "user") SELECT "id", "cnpj", "name_ngo", "date_register", "user_id", "user" FROM "temporary_ngo"`);
        await queryRunner.query(`DROP TABLE "temporary_ngo"`);
        await queryRunner.query(`DROP TABLE "ngo"`);
    }

}
