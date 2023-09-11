import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User{
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_active: boolean;

  @Column({
    type: 'datetime',
  })
  created_at: Date;
}