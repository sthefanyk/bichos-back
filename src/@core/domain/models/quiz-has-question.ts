import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import QuestionModel from './question.model';
import QuizModel from './quiz.model';

@Entity('quiz_has_question')
export default class QuizHasQuestionModel implements ModelMarker {

    @PrimaryColumn()
    id_quiz: string;
  
    @PrimaryColumn()
    id_question: string;
  
    @ManyToOne(() => QuizModel)
    @JoinColumn({ name: 'id_quiz' })
    quiz: QuizModel;
  
    @ManyToOne(() => QuestionModel)
    @JoinColumn({ name: 'id_question' })
    question: QuestionModel;
}
