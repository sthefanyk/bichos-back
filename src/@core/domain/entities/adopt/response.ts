import { EvaluationResponse } from 'src/@core/shared/domain/enums/evaluation-response.enum';
import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import { ResponseProps } from './response-props';

export type ResponseAttr = {
  id?: string;
  id_question: string;
  id_adopt: string;
  response: string;
  evaluation?: EvaluationResponse;
};

export class Response implements EntityMarker {
  private props: ResponseProps;

  constructor(responseAttr: ResponseAttr) {
    this.props = new ResponseProps(responseAttr);
  }

  toJson() {
    return { 
        ...this.props, 
        id: this.id,
        id_question: this.id_question,
        id_adopt: this.id_adopt,
    };
  }

  get id(): string {
    return this.props.id.id;
  }

  get id_question(): string {
    return this.props.id_question.id;
  }

  get id_adopt(): string {
    return this.props.id_adopt.id;
  }

  get response(): string {
    return this.props.response;
  }

  get evaluation(): EvaluationResponse {
    return this.props.evaluation;
  }
}
