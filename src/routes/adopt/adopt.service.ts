import { Injectable, Inject } from '@nestjs/common';
import {
  AdoptFindById,
  AdoptSearch,
  AdoptUsecase,
  ChooseAdopter,
  EvaluateResponses,
  GetAdopterByAdoptPostId,
} from '../../@core/application/use-cases/adopt';
import { AdoptCollectionPresenter } from './adopt.presenter';
import { SocketService } from '../../socket/socket.service';

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

  @Inject(SocketService)
  private readonly socketService: SocketService;

  async adopt(data: AdoptUsecase.Input) {
    const { id, id_poster } = await this.adoptUseCase.execute(data);
    // this.socketService.notifyPosterAdoptResponse("4ca0b600-3282-4264-8bfc-ef5479d1f386");
    return { id };
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
    const id_adopter = await this.chooseAdopterUseCase.execute(data);

    if (id_adopter) {
      this.socketService.notifyApprovedAdopter(id_adopter.id);
    }

    return { adopter: id_adopter };
  }

  async getAdopterByAdoptPostId(data: GetAdopterByAdoptPostId.Input) {
    const user = await this.getAdopterByAdoptPostIdUseCase.execute(data);

    if (!user) return null;
    return user.toJson();
  }
}
