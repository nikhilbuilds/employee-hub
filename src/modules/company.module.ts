import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from '../repositories/company.repository';
import { Company } from '../entities/company.entity';
import { COMPANY_REPOSITORY_TOKEN } from 'src/interfaces/company-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [
    { provide: COMPANY_REPOSITORY_TOKEN, useClass: CompanyRepository },
  ],
  exports: [COMPANY_REPOSITORY_TOKEN],
})
export class CompanyModule {}
