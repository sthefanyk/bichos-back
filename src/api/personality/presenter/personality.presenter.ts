import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../../@share/presenters/collection.presenter';
import { PersonalityOutput } from '#personality/application/dto/personality-output.dto';
import { ListPersonalitiesUseCase } from '#personality/application/use-cases/list-personalities.usecase';

export class PersonalityPresenter {
  id: string;
  name: string;
  is_active: boolean;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  created_at: Date;

  constructor(output: PersonalityOutput) {
    this.id = output.id;
    this.name = output.name;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
  }
}

export class PersonalityCollectionPresenter extends CollectionPresenter {
  data: PersonalityPresenter[];
  //sugestão de reuso
  // constructor(output: PersonalityOutput[], paginationProps){

  // }

  constructor(output: ListPersonalitiesUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new PersonalityPresenter(item));
  }
}
