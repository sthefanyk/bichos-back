import { EvaluationResponse } from '../../../shared/domain/enums/evaluation-response.enum';
import { EntityMarker } from '../../../shared/domain/markers/entity.marker';
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
    responseAttr.evaluation =
      responseAttr.evaluation ?? EvaluationResponse.NOT_EVALUATED;
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

  evaluate(evaluation: EvaluationResponse) {
    this.props.evaluation = evaluation;

    this.props.validate(this.props);
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
