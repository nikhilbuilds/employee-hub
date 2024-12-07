import { TimeOffRule } from '../entities/time-off-rule.entity';

export abstract class ITimeOffRulesRepository {
  abstract findRulesForCategory(categoryId: number): Promise<TimeOffRule[]>;
}
