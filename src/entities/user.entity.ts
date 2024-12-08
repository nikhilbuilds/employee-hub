import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  emailId: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
  })
  modifiedAt: Date;
}
