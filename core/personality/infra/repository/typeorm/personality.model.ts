import { Personality as PersonalityEntity } from 'src/core/personality/domain/entities/personality';
import Model from '../../../../@seedwork/domain/entity/model';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import UniqueEntityId from '../../../../@seedwork/domain/value-objects/unique-entity-id.vo';

@Entity()
export class Personality extends Model{
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  @Column({
    type: 'datetime',
  })
  created_at: Date;

  toEntity(props: any): PersonalityEntity {
    return new PersonalityEntity(
      {
        name: props.name,
        is_active: props.is_active,
        created_at: props.created_at,
      },
      new UniqueEntityId(props.id),
    );
  }
}