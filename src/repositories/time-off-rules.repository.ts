import { Equal, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeOffRule } from '../entities/time-off-rule.entity';
import { ITimeOffRulesRepository } from '../interfaces/time-off-rules-repository.interface';

@Injectable()
export class TimeOffRulesRepository implements ITimeOffRulesRepository {
  constructor(
    @InjectRepository(TimeOffRule)
    private readonly rulesRepository: Repository<TimeOffRule>,
  ) {}

  async findRulesForCategory(categoryId: number): Promise<TimeOffRule[]> {
    return await this.rulesRepository.find({
      where: { category: Equal(categoryId) },
      relations: ['canOverlap'],
    });
  }
}
