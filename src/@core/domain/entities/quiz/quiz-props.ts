import EntityProps from '../../../shared/domain/entities/entity-props';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { QuizAttr } from './quiz';
import { Question } from './question';

export default class QuizProps extends EntityProps {
  @Length(2, 45)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Length(2, 255)
  @IsString()
  @IsNotEmpty()
  description: string;

  questions: Question[];

  constructor(props: QuizAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.title = props.title;
    this.description = props.description;
    this.questions = props.questions;

    this.validate(this);
    this.title = props.title.toLowerCase();
  }
}
