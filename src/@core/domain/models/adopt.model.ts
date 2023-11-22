import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { StatusAdopt } from 'src/@core/shared/domain/enums/status_adopt.enum';
import { UserModel, PostModel, QuizModel } from '.';

@Entity('adopt')
export class AdoptModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserModel, user => user.id)
  @JoinColumn({name: 'id_adopter'})
  adopter: UserModel;

  @ManyToOne(() => PostModel, post => post.id)
  @JoinColumn({name: 'id_post'})
  post: PostModel;

  @ManyToOne(() => QuizModel, quiz => quiz.id)
  @JoinColumn({name: 'id_quiz'})
  quiz: QuizModel;

  @Column({ type: 'enum', enum: StatusAdopt, default: StatusAdopt.WAITING_QUIZ_CLOSE })
  status: StatusAdopt;

  @Column({ type: 'double', default: 0 })
  punctuation: number;

  @Column({ type: 'varchar' })
  feedback_poster: string;

  @Column({ type: 'varchar' })
  feedback_godfather: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;
}
