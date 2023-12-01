import { Injectable, Inject } from '@nestjs/common';
import {
  AdoptFindById,
  AdoptSearch,
  AdoptUsecase,
  ChooseAdopter,
  EvaluateResponses,
  GetAdopterByAdoptPostId,
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

  @Inject(EvaluateResponses.Usecase)
  private evaluateResponsesUseCase: EvaluateResponses.Usecase;

  @Inject(ChooseAdopter.Usecase)
  private chooseAdopterUseCase: ChooseAdopter.Usecase;

  @Inject(GetAdopterByAdoptPostId.Usecase)
  private getAdopterByAdoptPostIdUseCase: GetAdopterByAdoptPostId.Usecase;

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

  async evaluateResponses(data: EvaluateResponses.Input) {
    return await this.evaluateResponsesUseCase.execute(data);
  }

  async chooseAdopter(data: ChooseAdopter.Input) {
    return await this.chooseAdopterUseCase.execute(data);
  }

  async getAdopterByAdoptPostId(data: GetAdopterByAdoptPostId.Input) {
    const user = await this.getAdopterByAdoptPostIdUseCase.execute(data);

    if (!user) return null;
    return user.toJson();
  }
}
