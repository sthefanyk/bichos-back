import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import QuizProps from './quiz-props';
import { Question } from './question';

export type QuizAttr = {
  title: string;
  description: string;
  questions?: Question[];

  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class Quiz implements EntityMarker {
  private props: QuizProps;

  constructor(quizAttr: QuizAttr) {
    quizAttr.questions = quizAttr.questions ?? [];
    this.props = new QuizProps(quizAttr);
  }

  toJson() {
    return {
      ...this.props,
      id: this.props.id.id,
      questions: this.questions.map((q) => q.toJson()),
    };
  }

  public update(title: string, description: string) {
    this.props.title = title;
    this.props.description = description;
    this.props.updated_at = new Date();

    this.props.validate(this.props);
  }

  public activate() {
    this.props.deleted_at = null;
  }

  public inactivate() {
    this.props.deleted_at = new Date();
  }

  get questions(): Question[] {
    return this.props.questions;
  }

  get description(): string {
    return this.props.description;
  }

  get title(): string {
    return this.props.title;
  }

  get id(): string {
    return this.props.id.id;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  get deleted_at(): Date {
    return this.props.deleted_at;
  }
}
