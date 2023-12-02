import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import QuestionProps from './question-props';
import { QuestionTypes } from 'src/@core/shared/domain/enums/question-types.enum';
import { Alternative } from './alternative';

export type QuestionAttr = {
  question: string;
  type: QuestionTypes;
  others: boolean;
  alternatives?: Alternative[];

  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class Question implements EntityMarker {
  private props: QuestionProps;

  constructor(questionAttr: QuestionAttr) {
    questionAttr.alternatives = questionAttr.alternatives ?? [];
    this.props = new QuestionProps(questionAttr);
  }

  toJson() {
    return {
      ...this.props,
      id: this.id,
      alternatives: this.alternatives.map((a) => a.toJson()),
    };
  }

  public update(question: string, type: QuestionTypes, others: boolean) {
    this.props.question = question;
    this.props.type = type;
    this.props.others = others;
    this.props.updated_at = new Date();

    this.props.validate(this.props);
  }

  public activate() {
    this.props.deleted_at = null;
  }

  public inactivate() {
    this.props.deleted_at = new Date();
  }

  get alternatives(): Alternative[] {
    return this.props.alternatives;
  }

  get question(): string {
    return this.props.question;
  }

  get type(): QuestionTypes {
    return this.props.type;
  }

  get others(): boolean {
    return this.props.others;
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
