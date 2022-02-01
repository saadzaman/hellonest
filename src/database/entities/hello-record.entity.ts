import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hello-record')
export class HelloRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 16 })
  from!: string;

  @Column('text')
  msg!: string;
}
