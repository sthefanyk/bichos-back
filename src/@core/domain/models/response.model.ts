import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { EvaluationResponse } from 'src/@core/shared/domain/enums/evaluation-response.enum';
import QuestionModel from './question.model';
import AdoptModel from './adopt.model';

@Entity('response')
export default class ResponseModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => QuestionModel)
  @JoinColumn({name: 'id_question'})
  question: QuestionModel;

  @ManyToOne(() => AdoptModel)
  @JoinColumn({name: 'id_adopt'})
  adopt: AdoptModel;

  @Column({ type: 'simple-enum', default: EvaluationResponse.NOT_EVALUATED })
  evaluation: EvaluationResponse;

  @Column({ type: 'varchar' })
  response: string;
}
