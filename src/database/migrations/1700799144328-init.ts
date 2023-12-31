import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1700799144328 implements MigrationInterface {
  name = 'Init1700799144328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`state\` (\`name\` varchar(45) NOT NULL, \`abbreviation\` varchar(2) NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`city\` (\`name\` varchar(45) NOT NULL, \`state_name\` varchar(45) NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`adopt\` (\`id\` varchar(255) NOT NULL, \`status\` enum ('0', '1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '0', \`punctuation\` double NOT NULL DEFAULT '0', \`feedback_poster\` varchar(255) NOT NULL, \`feedback_godfather\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, \`id_adopter\` varchar(255) NULL, \`id_post\` varchar(255) NULL, \`id_quiz\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`alternative\` (\`id\` varchar(255) NOT NULL, \`alternative\` varchar(255) NOT NULL, \`id_question\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`animal_adopt\` (\`id\` varchar(255) NOT NULL, \`size_current\` enum ('0', '1', '2') NOT NULL, \`size_estimated\` enum ('0', '1', '2') NOT NULL, \`breed\` varchar(255) NOT NULL, \`status\` enum ('0', '1', '2', '3', '4', '5') NOT NULL DEFAULT '0', \`animal_id\` varchar(255) NULL, \`animal\` varchar(255) NULL, \`health\` varchar(255) NULL, UNIQUE INDEX \`REL_2c00852ad25a84c1ec6942ba3d\` (\`animal_id\`), UNIQUE INDEX \`REL_3c44488a140e1cd374bf860143\` (\`animal\`), UNIQUE INDEX \`REL_d3d199a291376029015cfff762\` (\`health\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`animal_has_need\` (\`id_animal\` varchar(255) NOT NULL, \`id_need\` varchar(255) NOT NULL, PRIMARY KEY (\`id_animal\`, \`id_need\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`animal_has_personality\` (\`id_animal\` varchar(255) NOT NULL, \`id_personality\` varchar(255) NOT NULL, PRIMARY KEY (\`id_animal\`, \`id_personality\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`animal\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`sex\` enum ('0', '1') NOT NULL DEFAULT '0', \`date_birth\` datetime NOT NULL, \`species\` enum ('0', '1') NOT NULL DEFAULT '0', \`history\` varchar(255) NOT NULL DEFAULT '', \`characteristic\` varchar(255) NOT NULL DEFAULT '', \`main_image\` varchar(255) NOT NULL, \`second_image\` varchar(255) NOT NULL, \`third_image\` varchar(255) NOT NULL, \`fourth_image\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`animal_sponsorship\` (\`id\` varchar(255) NOT NULL, \`accompany\` tinyint NOT NULL, \`reason_request\` varchar(255) NOT NULL, \`status\` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', \`animal_id\` varchar(255) NULL, \`animal\` varchar(255) NULL, UNIQUE INDEX \`REL_c29bf2882a10bd9ac148b9098e\` (\`animal_id\`), UNIQUE INDEX \`REL_a110919dd90a71d645b7ee14ed\` (\`animal\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`breed\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`specie\` enum ('0', '1') NOT NULL DEFAULT '0', \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disease_allergy\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('0', '1') NOT NULL DEFAULT '0', \`health\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vaccine_medicine\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` enum ('0', '1') NOT NULL DEFAULT '1', \`total_dose\` int NOT NULL, \`health\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`dose\` (\`id\` varchar(255) NOT NULL, \`number_dose\` int NOT NULL, \`application_date\` datetime NOT NULL, \`applied\` tinyint NOT NULL DEFAULT 0, \`id_vaccine_medicine\` varchar(255) NOT NULL, \`vaccine_medicine\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`health\` (\`id_animal\` varchar(255) NOT NULL, \`neutered\` tinyint NOT NULL, \`additional\` varchar(255) NOT NULL, PRIMARY KEY (\`id_animal\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`need\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`username\` varchar(16) NOT NULL, \`name\` varchar(16) NOT NULL DEFAULT '', \`description\` varchar(255) NOT NULL DEFAULT '', \`profile_picture\` varchar(255) NOT NULL DEFAULT '', \`header_picture\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '1', \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, \`city_name\` varchar(45) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ngo\` (\`id\` varchar(255) NOT NULL, \`cnpj\` varchar(14) NOT NULL, \`name_ngo\` varchar(45) NOT NULL, \`date_register\` datetime NOT NULL, \`user_id\` varchar(255) NULL, \`user\` varchar(255) NULL, UNIQUE INDEX \`IDX_3a730f37d3013bf3f184a20111\` (\`cnpj\`), UNIQUE INDEX \`IDX_9182da7b6904c65042d60ead3f\` (\`name_ngo\`), UNIQUE INDEX \`REL_e7225cd89f80ae8237a312726e\` (\`user_id\`), UNIQUE INDEX \`REL_32edca82504143adb7a8bda1c3\` (\`user\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`person\` (\`id\` varchar(255) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`date_birth\` datetime NOT NULL, \`user_id\` varchar(255) NULL, \`user\` varchar(255) NULL, UNIQUE INDEX \`IDX_264b7cad2330569e0ef5b4c39c\` (\`cpf\`), UNIQUE INDEX \`REL_5157fa65538cae06e66c922c89\` (\`user_id\`), UNIQUE INDEX \`REL_e08f75ffbab3620fc9746ee878\` (\`user\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`personality\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` varchar(255) NOT NULL, \`urgent\` tinyint NOT NULL, \`renewal_count\` int NOT NULL, \`type\` enum ('0', '1') NOT NULL DEFAULT '0', \`urgency_justification\` varchar(255) NOT NULL DEFAULT '', \`contact_name\` varchar(255) NOT NULL, \`contact_email\` varchar(255) NOT NULL, \`contact_phone\` varchar(255) NOT NULL, \`latest_status_update\` datetime NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, \`user_id\` varchar(255) NULL, \`city_name\` varchar(45) NULL, \`animal\` varchar(255) NULL, UNIQUE INDEX \`REL_2fbd8313d9bdb401a74f2b71e5\` (\`animal\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`question\` (\`id\` varchar(255) NOT NULL, \`question\` varchar(255) NOT NULL, \`type\` enum ('0', '1') NOT NULL DEFAULT '1', \`others\` tinyint NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`quiz_has_question\` (\`id_quiz\` varchar(255) NOT NULL, \`id_question\` varchar(255) NOT NULL, PRIMARY KEY (\`id_quiz\`, \`id_question\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`quiz\` (\`id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`response\` (\`id\` varchar(255) NOT NULL, \`evaluation\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0', \`response\` varchar(255) NOT NULL, \`id_question\` varchar(255) NULL, \`id_adopt\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`shelter\` (\`id\` varchar(255) NOT NULL, \`responsible_cpf\` varchar(11) NOT NULL, \`responsible_date_birth\` datetime NOT NULL, \`name_shelter\` varchar(255) NOT NULL, \`star_date_shelter\` datetime NOT NULL, \`user_id\` varchar(255) NULL, \`user\` varchar(255) NULL, UNIQUE INDEX \`IDX_ca7499ae2ae41a67e488e8cd18\` (\`responsible_cpf\`), UNIQUE INDEX \`REL_6b37a09b857e638e3200dcc995\` (\`user_id\`), UNIQUE INDEX \`REL_4174333359fe477e96b2929f1a\` (\`user\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sponsorship\` (\`id\` varchar(255) NOT NULL, \`status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0', \`feedback_poster\` varchar(255) NOT NULL, \`feedback_godfather\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, \`id_godfather\` varchar(255) NULL, \`id_post\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`gallery\` (\`id\` varchar(255) NOT NULL, \`type\` enum ('0', '1', '2') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`city\` ADD CONSTRAINT \`FK_5ed5331a309d2f6ca5bf4767ac1\` FOREIGN KEY (\`state_name\`) REFERENCES \`state\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_c84d48c9ff808cf74b6311bcafb\` FOREIGN KEY (\`id_adopter\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_f41176e206c2777f0644151b973\` FOREIGN KEY (\`id_post\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_f91d31d6a8eb7798377b3e31a64\` FOREIGN KEY (\`id_quiz\`) REFERENCES \`quiz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_2c00852ad25a84c1ec6942ba3dc\` FOREIGN KEY (\`animal_id\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_3c44488a140e1cd374bf8601439\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_d3d199a291376029015cfff7628\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_has_need\` ADD CONSTRAINT \`FK_fd9d8faa9c98c137a58b02ed5bf\` FOREIGN KEY (\`id_animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_has_need\` ADD CONSTRAINT \`FK_25e0a712bb284a4f8fd61686634\` FOREIGN KEY (\`id_need\`) REFERENCES \`need\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_has_personality\` ADD CONSTRAINT \`FK_2d402085f05e4adc03585812e67\` FOREIGN KEY (\`id_animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_has_personality\` ADD CONSTRAINT \`FK_070c04e6ea69e803ae37281d0b8\` FOREIGN KEY (\`id_personality\`) REFERENCES \`personality\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_sponsorship\` ADD CONSTRAINT \`FK_c29bf2882a10bd9ac148b9098e3\` FOREIGN KEY (\`animal_id\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_sponsorship\` ADD CONSTRAINT \`FK_a110919dd90a71d645b7ee14ed6\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disease_allergy\` ADD CONSTRAINT \`FK_ca70471f92e417a93967d415543\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vaccine_medicine\` ADD CONSTRAINT \`FK_2a28b13055a7e814d3f2477d73a\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`dose\` ADD CONSTRAINT \`FK_1b512081e84a5d64fbf5a453618\` FOREIGN KEY (\`vaccine_medicine\`) REFERENCES \`vaccine_medicine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`health\` ADD CONSTRAINT \`FK_4c5924675d6bdbf1aeec61a6100\` FOREIGN KEY (\`id_animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_a633d4ffb0563912c7b391fa967\` FOREIGN KEY (\`city_name\`) REFERENCES \`city\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ngo\` ADD CONSTRAINT \`FK_e7225cd89f80ae8237a312726e9\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ngo\` ADD CONSTRAINT \`FK_32edca82504143adb7a8bda1c37\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_5157fa65538cae06e66c922c898\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e08f75ffbab3620fc9746ee8789\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_d192626ed754ff5da39190d168a\` FOREIGN KEY (\`city_name\`) REFERENCES \`city\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_2fbd8313d9bdb401a74f2b71e59\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`quiz_has_question\` ADD CONSTRAINT \`FK_72f9f77b7dcd823c66e6978cfb8\` FOREIGN KEY (\`id_quiz\`) REFERENCES \`quiz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`quiz_has_question\` ADD CONSTRAINT \`FK_c1836ed645a3b25bf1b974812b8\` FOREIGN KEY (\`id_question\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`response\` ADD CONSTRAINT \`FK_ff28c5d4f1fc26fd2f378c62536\` FOREIGN KEY (\`id_question\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`response\` ADD CONSTRAINT \`FK_36bcdacf890d0fe8a290885b89e\` FOREIGN KEY (\`id_adopt\`) REFERENCES \`adopt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`shelter\` ADD CONSTRAINT \`FK_6b37a09b857e638e3200dcc995d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`shelter\` ADD CONSTRAINT \`FK_4174333359fe477e96b2929f1ab\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sponsorship\` ADD CONSTRAINT \`FK_bd50037882b9afad30eec3e9dee\` FOREIGN KEY (\`id_godfather\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sponsorship\` ADD CONSTRAINT \`FK_8cce16e2e15efa51bf89177a992\` FOREIGN KEY (\`id_post\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sponsorship\` DROP FOREIGN KEY \`FK_8cce16e2e15efa51bf89177a992\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sponsorship\` DROP FOREIGN KEY \`FK_bd50037882b9afad30eec3e9dee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`shelter\` DROP FOREIGN KEY \`FK_4174333359fe477e96b2929f1ab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`shelter\` DROP FOREIGN KEY \`FK_6b37a09b857e638e3200dcc995d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`response\` DROP FOREIGN KEY \`FK_36bcdacf890d0fe8a290885b89e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`response\` DROP FOREIGN KEY \`FK_ff28c5d4f1fc26fd2f378c62536\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`quiz_has_question\` DROP FOREIGN KEY \`FK_c1836ed645a3b25bf1b974812b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`quiz_has_question\` DROP FOREIGN KEY \`FK_72f9f77b7dcd823c66e6978cfb8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_2fbd8313d9bdb401a74f2b71e59\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_d192626ed754ff5da39190d168a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e08f75ffbab3620fc9746ee8789\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_5157fa65538cae06e66c922c898\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ngo\` DROP FOREIGN KEY \`FK_32edca82504143adb7a8bda1c37\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ngo\` DROP FOREIGN KEY \`FK_e7225cd89f80ae8237a312726e9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_a633d4ffb0563912c7b391fa967\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`health\` DROP FOREIGN KEY \`FK_4c5924675d6bdbf1aeec61a6100\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`dose\` DROP FOREIGN KEY \`FK_1b512081e84a5d64fbf5a453618\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vaccine_medicine\` DROP FOREIGN KEY \`FK_2a28b13055a7e814d3f2477d73a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disease_allergy\` DROP FOREIGN KEY \`FK_ca70471f92e417a93967d415543\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_sponsorship\` DROP FOREIGN KEY \`FK_a110919dd90a71d645b7ee14ed6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_sponsorship\` DROP FOREIGN KEY \`FK_c29bf2882a10bd9ac148b9098e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_has_personality\` DROP FOREIGN KEY \`FK_070c04e6ea69e803ae37281d0b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_has_personality\` DROP FOREIGN KEY \`FK_2d402085f05e4adc03585812e67\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_has_need\` DROP FOREIGN KEY \`FK_25e0a712bb284a4f8fd61686634\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_has_need\` DROP FOREIGN KEY \`FK_fd9d8faa9c98c137a58b02ed5bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_d3d199a291376029015cfff7628\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_3c44488a140e1cd374bf8601439\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_2c00852ad25a84c1ec6942ba3dc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_f91d31d6a8eb7798377b3e31a64\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_f41176e206c2777f0644151b973\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_c84d48c9ff808cf74b6311bcafb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`city\` DROP FOREIGN KEY \`FK_5ed5331a309d2f6ca5bf4767ac1\``,
    );
    await queryRunner.query(`DROP TABLE \`gallery\``);
    await queryRunner.query(`DROP TABLE \`sponsorship\``);
    await queryRunner.query(
      `DROP INDEX \`REL_4174333359fe477e96b2929f1a\` ON \`shelter\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_6b37a09b857e638e3200dcc995\` ON \`shelter\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ca7499ae2ae41a67e488e8cd18\` ON \`shelter\``,
    );
    await queryRunner.query(`DROP TABLE \`shelter\``);
    await queryRunner.query(`DROP TABLE \`response\``);
    await queryRunner.query(`DROP TABLE \`quiz\``);
    await queryRunner.query(`DROP TABLE \`quiz_has_question\``);
    await queryRunner.query(`DROP TABLE \`question\``);
    await queryRunner.query(
      `DROP INDEX \`REL_2fbd8313d9bdb401a74f2b71e5\` ON \`post\``,
    );
    await queryRunner.query(`DROP TABLE \`post\``);
    await queryRunner.query(`DROP TABLE \`personality\``);
    await queryRunner.query(
      `DROP INDEX \`REL_e08f75ffbab3620fc9746ee878\` ON \`person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_5157fa65538cae06e66c922c89\` ON \`person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_264b7cad2330569e0ef5b4c39c\` ON \`person\``,
    );
    await queryRunner.query(`DROP TABLE \`person\``);
    await queryRunner.query(
      `DROP INDEX \`REL_32edca82504143adb7a8bda1c3\` ON \`ngo\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_e7225cd89f80ae8237a312726e\` ON \`ngo\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9182da7b6904c65042d60ead3f\` ON \`ngo\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3a730f37d3013bf3f184a20111\` ON \`ngo\``,
    );
    await queryRunner.query(`DROP TABLE \`ngo\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`need\``);
    await queryRunner.query(`DROP TABLE \`health\``);
    await queryRunner.query(`DROP TABLE \`dose\``);
    await queryRunner.query(`DROP TABLE \`vaccine_medicine\``);
    await queryRunner.query(`DROP TABLE \`disease_allergy\``);
    await queryRunner.query(`DROP TABLE \`breed\``);
    await queryRunner.query(
      `DROP INDEX \`REL_a110919dd90a71d645b7ee14ed\` ON \`animal_sponsorship\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c29bf2882a10bd9ac148b9098e\` ON \`animal_sponsorship\``,
    );
    await queryRunner.query(`DROP TABLE \`animal_sponsorship\``);
    await queryRunner.query(`DROP TABLE \`animal\``);
    await queryRunner.query(`DROP TABLE \`animal_has_personality\``);
    await queryRunner.query(`DROP TABLE \`animal_has_need\``);
    await queryRunner.query(
      `DROP INDEX \`REL_d3d199a291376029015cfff762\` ON \`animal_adopt\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3c44488a140e1cd374bf860143\` ON \`animal_adopt\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_2c00852ad25a84c1ec6942ba3d\` ON \`animal_adopt\``,
    );
    await queryRunner.query(`DROP TABLE \`animal_adopt\``);
    await queryRunner.query(`DROP TABLE \`alternative\``);
    await queryRunner.query(`DROP TABLE \`adopt\``);
    await queryRunner.query(`DROP TABLE \`city\``);
    await queryRunner.query(`DROP TABLE \`state\``);
  }
}
