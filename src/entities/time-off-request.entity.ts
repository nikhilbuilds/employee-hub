import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { RequestCategory } from './request-category.entity';
import { Employee } from './employee.entity';

@Entity('time_off_request')
export class TimeOffRequest {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => RequestCategory, { nullable: false })
  @JoinColumn({ name: 'request_category_id' })
  requestCategory: RequestCategory;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employee_id' })
  employeeId: Employee;

  // @Column({ nullable: false, name: 'employee_id' })
  // employeeId: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
