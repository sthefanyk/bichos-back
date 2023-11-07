import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../@share/presenters/collection.presenter';
import { SearchAdoptPost } from 'src/@core/application/use-cases/post';
import { AdoptPostOutputDto } from 'src/@core/application/DTOs/adopt-post.dto';
import { StatusPost } from 'src/@core/shared/domain/enums/status_post.enum';
import { TypePost } from 'src/@core/shared/domain/enums/type_post.enum';
import { SexAnimal } from 'src/@core/shared/domain/enums/sex-animal';
import { Species } from 'src/@core/shared/domain/enums/species.enum';
import { SizeAnimal } from 'src/@core/shared/domain/enums/size-animal';
import { Personality } from 'src/@core/domain/entities/personality';

export class AdoptPostPresenter {
  id: string;

  urgent: boolean;

  posted_by: string;

  renewal_count: number;

  status: StatusPost;

  type: TypePost;

  urgency_justification: string;

  animal: {
    name: string;
    sex: SexAnimal;
    date_birth: Date;
    species: Species;
    history: string;
    characteristic: string;
    personalities: Personality[],
    size_current: SizeAnimal,
    size_estimated: SizeAnimal,
    id: string,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
  };

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  created_at: Date;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  updated_at: Date;

  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  deleted_at: Date;

  constructor(output: AdoptPostOutputDto) {
    this.id = output.id;
    this.urgent = output.urgent;
    this.posted_by = output.posted_by;
    this.renewal_count = output.renewal_count;
    this.status = output.status;
    this.type = output.type;
    this.urgency_justification = output.urgency_justification;
    this.animal = output.animal;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
    this.deleted_at = output.deleted_at;
  }
}

export class AdoptPostCollectionPresenter extends CollectionPresenter {
  data: AdoptPostPresenter[];

  constructor(output: SearchAdoptPost.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new AdoptPostPresenter(item));
  }
}
