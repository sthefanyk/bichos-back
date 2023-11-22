import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagesInAnimal1700687935467 implements MigrationInterface {
    name = 'AddImagesInAnimal1700687935467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animal\` ADD \`main_image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`animal\` ADD \`second_image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`animal\` ADD \`third_image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`animal\` ADD \`fourth_image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`city\` DROP FOREIGN KEY \`FK_5ed5331a309d2f6ca5bf4767ac1\``);
        await queryRunner.query(`ALTER TABLE \`city\` CHANGE \`state_name\` \`state_name\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_c84d48c9ff808cf74b6311bcafb\``);
        await queryRunner.query(`ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_f41176e206c2777f0644151b973\``);
        await queryRunner.query(`ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_f91d31d6a8eb7798377b3e31a64\``);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`id_adopter\` \`id_adopter\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`id_post\` \`id_post\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`id_quiz\` \`id_quiz\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_2c00852ad25a84c1ec6942ba3dc\``);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_3c44488a140e1cd374bf8601439\``);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_d3d199a291376029015cfff7628\``);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` CHANGE \`animal_id\` \`animal_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` CHANGE \`animal\` \`animal\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` CHANGE \`health\` \`health\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` DROP FOREIGN KEY \`FK_c29bf2882a10bd9ac148b9098e3\``);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` DROP FOREIGN KEY \`FK_a110919dd90a71d645b7ee14ed6\``);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` CHANGE \`animal_id\` \`animal_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` CHANGE \`animal\` \`animal\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`breed\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`breed\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`disease_allergy\` DROP FOREIGN KEY \`FK_ca70471f92e417a93967d415543\``);
        await queryRunner.query(`ALTER TABLE \`disease_allergy\` CHANGE \`health\` \`health\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_medicine\` DROP FOREIGN KEY \`FK_2a28b13055a7e814d3f2477d73a\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_medicine\` CHANGE \`health\` \`health\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`dose\` DROP FOREIGN KEY \`FK_1b512081e84a5d64fbf5a453618\``);
        await queryRunner.query(`ALTER TABLE \`dose\` CHANGE \`vaccine_medicine\` \`vaccine_medicine\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`need\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`need\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_a633d4ffb0563912c7b391fa967\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city_name\` \`city_name\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`ngo\` DROP FOREIGN KEY \`FK_e7225cd89f80ae8237a312726e9\``);
        await queryRunner.query(`ALTER TABLE \`ngo\` DROP FOREIGN KEY \`FK_32edca82504143adb7a8bda1c37\``);
        await queryRunner.query(`ALTER TABLE \`ngo\` CHANGE \`user_id\` \`user_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`ngo\` CHANGE \`user\` \`user\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_5157fa65538cae06e66c922c898\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e08f75ffbab3620fc9746ee8789\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`user_id\` \`user_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`user\` \`user\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`personality\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`personality\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_d192626ed754ff5da39190d168a\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_2fbd8313d9bdb401a74f2b71e59\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user_id\` \`user_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`city_name\` \`city_name\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`animal\` \`animal\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`quiz\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`quiz\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`response\` DROP FOREIGN KEY \`FK_ff28c5d4f1fc26fd2f378c62536\``);
        await queryRunner.query(`ALTER TABLE \`response\` DROP FOREIGN KEY \`FK_36bcdacf890d0fe8a290885b89e\``);
        await queryRunner.query(`ALTER TABLE \`response\` CHANGE \`id_question\` \`id_question\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`response\` CHANGE \`id_adopt\` \`id_adopt\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`shelter\` DROP FOREIGN KEY \`FK_6b37a09b857e638e3200dcc995d\``);
        await queryRunner.query(`ALTER TABLE \`shelter\` DROP FOREIGN KEY \`FK_4174333359fe477e96b2929f1ab\``);
        await queryRunner.query(`ALTER TABLE \`shelter\` CHANGE \`user_id\` \`user_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`shelter\` CHANGE \`user\` \`user\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` DROP FOREIGN KEY \`FK_bd50037882b9afad30eec3e9dee\``);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` DROP FOREIGN KEY \`FK_8cce16e2e15efa51bf89177a992\``);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` CHANGE \`updated_at\` \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` CHANGE \`id_godfather\` \`id_godfather\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` CHANGE \`id_post\` \`id_post\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_b332ce64cb795da2c34900c06c5\``);
        await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`user\` \`user\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`city\` ADD CONSTRAINT \`FK_5ed5331a309d2f6ca5bf4767ac1\` FOREIGN KEY (\`state_name\`) REFERENCES \`state\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_c84d48c9ff808cf74b6311bcafb\` FOREIGN KEY (\`id_adopter\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_f41176e206c2777f0644151b973\` FOREIGN KEY (\`id_post\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_f91d31d6a8eb7798377b3e31a64\` FOREIGN KEY (\`id_quiz\`) REFERENCES \`quiz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_2c00852ad25a84c1ec6942ba3dc\` FOREIGN KEY (\`animal_id\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_3c44488a140e1cd374bf8601439\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_d3d199a291376029015cfff7628\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` ADD CONSTRAINT \`FK_c29bf2882a10bd9ac148b9098e3\` FOREIGN KEY (\`animal_id\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` ADD CONSTRAINT \`FK_a110919dd90a71d645b7ee14ed6\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`disease_allergy\` ADD CONSTRAINT \`FK_ca70471f92e417a93967d415543\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_medicine\` ADD CONSTRAINT \`FK_2a28b13055a7e814d3f2477d73a\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dose\` ADD CONSTRAINT \`FK_1b512081e84a5d64fbf5a453618\` FOREIGN KEY (\`vaccine_medicine\`) REFERENCES \`vaccine_medicine\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_a633d4ffb0563912c7b391fa967\` FOREIGN KEY (\`city_name\`) REFERENCES \`city\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ngo\` ADD CONSTRAINT \`FK_e7225cd89f80ae8237a312726e9\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ngo\` ADD CONSTRAINT \`FK_32edca82504143adb7a8bda1c37\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_5157fa65538cae06e66c922c898\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e08f75ffbab3620fc9746ee8789\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_d192626ed754ff5da39190d168a\` FOREIGN KEY (\`city_name\`) REFERENCES \`city\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_2fbd8313d9bdb401a74f2b71e59\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`response\` ADD CONSTRAINT \`FK_ff28c5d4f1fc26fd2f378c62536\` FOREIGN KEY (\`id_question\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`response\` ADD CONSTRAINT \`FK_36bcdacf890d0fe8a290885b89e\` FOREIGN KEY (\`id_adopt\`) REFERENCES \`adopt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shelter\` ADD CONSTRAINT \`FK_6b37a09b857e638e3200dcc995d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shelter\` ADD CONSTRAINT \`FK_4174333359fe477e96b2929f1ab\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` ADD CONSTRAINT \`FK_bd50037882b9afad30eec3e9dee\` FOREIGN KEY (\`id_godfather\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` ADD CONSTRAINT \`FK_8cce16e2e15efa51bf89177a992\` FOREIGN KEY (\`id_post\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_b332ce64cb795da2c34900c06c5\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_b332ce64cb795da2c34900c06c5\``);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` DROP FOREIGN KEY \`FK_8cce16e2e15efa51bf89177a992\``);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` DROP FOREIGN KEY \`FK_bd50037882b9afad30eec3e9dee\``);
        await queryRunner.query(`ALTER TABLE \`shelter\` DROP FOREIGN KEY \`FK_4174333359fe477e96b2929f1ab\``);
        await queryRunner.query(`ALTER TABLE \`shelter\` DROP FOREIGN KEY \`FK_6b37a09b857e638e3200dcc995d\``);
        await queryRunner.query(`ALTER TABLE \`response\` DROP FOREIGN KEY \`FK_36bcdacf890d0fe8a290885b89e\``);
        await queryRunner.query(`ALTER TABLE \`response\` DROP FOREIGN KEY \`FK_ff28c5d4f1fc26fd2f378c62536\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_2fbd8313d9bdb401a74f2b71e59\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_d192626ed754ff5da39190d168a\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e08f75ffbab3620fc9746ee8789\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_5157fa65538cae06e66c922c898\``);
        await queryRunner.query(`ALTER TABLE \`ngo\` DROP FOREIGN KEY \`FK_32edca82504143adb7a8bda1c37\``);
        await queryRunner.query(`ALTER TABLE \`ngo\` DROP FOREIGN KEY \`FK_e7225cd89f80ae8237a312726e9\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_a633d4ffb0563912c7b391fa967\``);
        await queryRunner.query(`ALTER TABLE \`dose\` DROP FOREIGN KEY \`FK_1b512081e84a5d64fbf5a453618\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_medicine\` DROP FOREIGN KEY \`FK_2a28b13055a7e814d3f2477d73a\``);
        await queryRunner.query(`ALTER TABLE \`disease_allergy\` DROP FOREIGN KEY \`FK_ca70471f92e417a93967d415543\``);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` DROP FOREIGN KEY \`FK_a110919dd90a71d645b7ee14ed6\``);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` DROP FOREIGN KEY \`FK_c29bf2882a10bd9ac148b9098e3\``);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_d3d199a291376029015cfff7628\``);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_3c44488a140e1cd374bf8601439\``);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` DROP FOREIGN KEY \`FK_2c00852ad25a84c1ec6942ba3dc\``);
        await queryRunner.query(`ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_f91d31d6a8eb7798377b3e31a64\``);
        await queryRunner.query(`ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_f41176e206c2777f0644151b973\``);
        await queryRunner.query(`ALTER TABLE \`adopt\` DROP FOREIGN KEY \`FK_c84d48c9ff808cf74b6311bcafb\``);
        await queryRunner.query(`ALTER TABLE \`city\` DROP FOREIGN KEY \`FK_5ed5331a309d2f6ca5bf4767ac1\``);
        await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`user\` \`user\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_b332ce64cb795da2c34900c06c5\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` CHANGE \`id_post\` \`id_post\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` CHANGE \`id_godfather\` \`id_godfather\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` ADD CONSTRAINT \`FK_8cce16e2e15efa51bf89177a992\` FOREIGN KEY (\`id_post\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sponsorship\` ADD CONSTRAINT \`FK_bd50037882b9afad30eec3e9dee\` FOREIGN KEY (\`id_godfather\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shelter\` CHANGE \`user\` \`user\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`shelter\` CHANGE \`user_id\` \`user_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`shelter\` ADD CONSTRAINT \`FK_4174333359fe477e96b2929f1ab\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shelter\` ADD CONSTRAINT \`FK_6b37a09b857e638e3200dcc995d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`response\` CHANGE \`id_adopt\` \`id_adopt\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`response\` CHANGE \`id_question\` \`id_question\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`response\` ADD CONSTRAINT \`FK_36bcdacf890d0fe8a290885b89e\` FOREIGN KEY (\`id_adopt\`) REFERENCES \`adopt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`response\` ADD CONSTRAINT \`FK_ff28c5d4f1fc26fd2f378c62536\` FOREIGN KEY (\`id_question\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`quiz\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`animal\` \`animal\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`city_name\` \`city_name\` varchar(45) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user_id\` \`user_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_2fbd8313d9bdb401a74f2b71e59\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_d192626ed754ff5da39190d168a\` FOREIGN KEY (\`city_name\`) REFERENCES \`city\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`personality\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`personality\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`user\` \`user\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`user_id\` \`user_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e08f75ffbab3620fc9746ee8789\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_5157fa65538cae06e66c922c898\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ngo\` CHANGE \`user\` \`user\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ngo\` CHANGE \`user_id\` \`user_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ngo\` ADD CONSTRAINT \`FK_32edca82504143adb7a8bda1c37\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ngo\` ADD CONSTRAINT \`FK_e7225cd89f80ae8237a312726e9\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city_name\` \`city_name\` varchar(45) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_a633d4ffb0563912c7b391fa967\` FOREIGN KEY (\`city_name\`) REFERENCES \`city\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`need\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`need\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`dose\` CHANGE \`vaccine_medicine\` \`vaccine_medicine\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`dose\` ADD CONSTRAINT \`FK_1b512081e84a5d64fbf5a453618\` FOREIGN KEY (\`vaccine_medicine\`) REFERENCES \`vaccine_medicine\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_medicine\` CHANGE \`health\` \`health\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`vaccine_medicine\` ADD CONSTRAINT \`FK_2a28b13055a7e814d3f2477d73a\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`disease_allergy\` CHANGE \`health\` \`health\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`disease_allergy\` ADD CONSTRAINT \`FK_ca70471f92e417a93967d415543\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`breed\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`breed\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` CHANGE \`animal\` \`animal\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` CHANGE \`animal_id\` \`animal_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` ADD CONSTRAINT \`FK_a110919dd90a71d645b7ee14ed6\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal_sponsorship\` ADD CONSTRAINT \`FK_c29bf2882a10bd9ac148b9098e3\` FOREIGN KEY (\`animal_id\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`animal\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` CHANGE \`health\` \`health\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` CHANGE \`animal\` \`animal\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` CHANGE \`animal_id\` \`animal_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_d3d199a291376029015cfff7628\` FOREIGN KEY (\`health\`) REFERENCES \`health\`(\`id_animal\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_3c44488a140e1cd374bf8601439\` FOREIGN KEY (\`animal\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal_adopt\` ADD CONSTRAINT \`FK_2c00852ad25a84c1ec6942ba3dc\` FOREIGN KEY (\`animal_id\`) REFERENCES \`animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`id_quiz\` \`id_quiz\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`id_post\` \`id_post\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`id_adopter\` \`id_adopter\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`adopt\` CHANGE \`updated_at\` \`updated_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_f91d31d6a8eb7798377b3e31a64\` FOREIGN KEY (\`id_quiz\`) REFERENCES \`quiz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_f41176e206c2777f0644151b973\` FOREIGN KEY (\`id_post\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopt\` ADD CONSTRAINT \`FK_c84d48c9ff808cf74b6311bcafb\` FOREIGN KEY (\`id_adopter\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`city\` CHANGE \`state_name\` \`state_name\` varchar(45) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`city\` ADD CONSTRAINT \`FK_5ed5331a309d2f6ca5bf4767ac1\` FOREIGN KEY (\`state_name\`) REFERENCES \`state\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`animal\` DROP COLUMN \`fourth_image\``);
        await queryRunner.query(`ALTER TABLE \`animal\` DROP COLUMN \`third_image\``);
        await queryRunner.query(`ALTER TABLE \`animal\` DROP COLUMN \`second_image\``);
        await queryRunner.query(`ALTER TABLE \`animal\` DROP COLUMN \`main_image\``);
    }

}
