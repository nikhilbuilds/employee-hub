import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('request_category')
export class RequestCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
