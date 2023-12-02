import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { QuestionTypes } from '../../shared/domain/enums/question-types.enum';

@Entity('question')
export class QuestionModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ type: 'varchar' })
  question: string;

  @Column({
    type: 'enum',
    enum: QuestionTypes,
    default: QuestionTypes.ALTERNATIVE,
  })
  type: QuestionTypes;

  @Column({ type: 'boolean' })
  others: boolean;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;
}
