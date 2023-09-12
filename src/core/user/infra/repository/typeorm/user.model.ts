import { User as UserEntity } from 'src/core/user/domain/entities/user';
import Model from '../../../../@seedwork/domain/entity/model';
import { Entity as EntityORM, PrimaryColumn, Column } from 'typeorm';
import UniqueEntityId from '../../../../@seedwork/domain/value-objects/unique-entity-id.vo';

@EntityORM()
export class User extends Model {
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

  toEntity(props: any): UserEntity {
    return new UserEntity(
      {
        name: props.name,
        email: props.email,
        password: props.password,
        is_active: props.is_active,
        created_at: props.created_at,
      },
      new UniqueEntityId(props.id),
    );
  }
}
