import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RequestCategory } from './request-category.entity';

@Entity('time_off_rules')
export class TimeOffRule {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => RequestCategory, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: RequestCategory;

  @ManyToOne(() => RequestCategory, { nullable: false })
  @JoinColumn({ name: 'can_overlap_id' })
  canOverlap: RequestCategory;

  @Column({ name: 'is_allowed', type: 'boolean', default: false })
  isAllowed: boolean; // true if overlap is allowed
}
