import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import { StatusAdopt } from 'src/@core/shared/domain/enums/status_adopt.enum';
import AdoptProps from './adopt-props';
import { Response } from './response';

export type AdoptAttr = {
  id?: string;
  id_adopter: string;
  id_post: string;
  id_quiz: string;
  punctuation?: number;
  status?: StatusAdopt;
  feedback_poster?: string;
  feedback_godfather?: string;
  responses: Response[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class Adopt implements EntityMarker {
  private props: AdoptProps;

  constructor(adoptAttr: AdoptAttr) {
    this.props = new AdoptProps(adoptAttr);
  }

  toJson() {
    return { 
        ...this.props, 
        id: this.id,
        id_adopter: this.id_adopter,
        id_post: this.id_post,
        id_quiz: this.id_quiz,
        responses: this.responses.map(r => r.toJson())
    };
  }
  
  get status(): StatusAdopt {
    return this.props.status;
  }

  get responses(): Response[] {
    return this.props.responses;
  }

  get punctuation(): number {
    return this.props.punctuation;
  }

  get feedback_godfather(): string {
    return this.props.feedback_godfather;
  }

  get feedback_poster(): string {
    return this.props.feedback_poster;
  }

  get id_quiz(): string {
    return this.props.id_quiz.id;
  }

  get id_post(): string {
    return this.props.id_post.id;
  }

  get id_adopter(): string {
    return this.props.id_adopter.id;
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
