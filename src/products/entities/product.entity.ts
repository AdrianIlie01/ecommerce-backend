import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from '../../shared/type';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: null,
  })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'enum', enum: Type, nullable: false })
  type: Type;
}
