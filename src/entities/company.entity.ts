import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column()
  companyName: string;

  @Column()
  address: string;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
    select: false,
  })
  modifiedAt: Date;
}
