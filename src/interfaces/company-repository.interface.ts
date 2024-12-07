import { Company } from 'src/entities/company.entity';

export interface ICompanyRepository {
  findOneById(companyId: string): Promise<Company | null>;
}

export const COMPANY_REPOSITORY_TOKEN = Symbol('ICompanyRepository');
