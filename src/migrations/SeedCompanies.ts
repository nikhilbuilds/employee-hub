import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCompanies implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO company (company_name, address, created_at, modified_at)
      VALUES
        ('Tech Corp', '123 Silicon Valley', now(), now()),
        ('Innovate Ltd.', '456 Tech Park', now(), now()),
        ('Future Solutions', '789 Innovation Drive', now(), now());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM company WHERE company_name IN ('Tech Corp', 'Innovate Ltd.', 'Future Solutions');
    `);
  }
}
