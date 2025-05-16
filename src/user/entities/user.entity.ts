import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  ip: string;

  @Column({ type: 'text', nullable: true, default: null })
  user_agent: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_date: Date;
}
