import { Injectable, Inject } from '@nestjs/common';
import {
  AdoptFindById,
  AdoptSearch,
  AdoptUsecase,
} from 'src/@core/application/use-cases/adopt';
import { AdoptCollectionPresenter } from './adopt.presenter';

@Injectable()
export class AdoptService {
  @Inject(AdoptUsecase.Usecase)
  private adoptUseCase: AdoptUsecase.Usecase;

  @Inject(AdoptFindById.Usecase)
  private adoptFindById: AdoptFindById.Usecase;

  @Inject(AdoptSearch.Usecase)
  private adoptSearch: AdoptSearch.Usecase;

  async adopt(data: AdoptUsecase.Input) {
    return await this.adoptUseCase.execute(data);
  }

  async findOne(id: string) {
    const output = await this.adoptFindById.execute({ id });
    return output.toJson();
  }

  async search(searchParams: AdoptSearch.Input) {
    const output = await this.adoptSearch.execute(searchParams);
    return new AdoptCollectionPresenter(output);
  }
}
