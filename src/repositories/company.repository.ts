import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICompanyRepository } from 'src/interfaces/company-repository.interface';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findOneById(companyId: string): Promise<Company> {
    return await this.companyRepository.findOne({ where: { companyId } });
  }
}
