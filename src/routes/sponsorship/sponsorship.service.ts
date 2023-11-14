import { Injectable, Inject } from '@nestjs/common';
import {
  SponsorshipFindById,
  SponsorshipSearch,
  SponsorshipUsecase,
} from 'src/@core/application/use-cases/sponsorship';
import { SponsorshipCollectionPresenter } from './sponsorship.presenter';

@Injectable()
export class SponsorshipService {
  @Inject(SponsorshipUsecase.Usecase)
  private sponsorshipUseCase: SponsorshipUsecase.Usecase;

  @Inject(SponsorshipFindById.Usecase)
  private sponsorshipFindById: SponsorshipFindById.Usecase;

  @Inject(SponsorshipSearch.Usecase)
  private sponsorshipSearch: SponsorshipSearch.Usecase;

  async sponsorship(data: SponsorshipUsecase.Input) {
    return await this.sponsorshipUseCase.execute(data);
  }

  async findOne(id: string) {
    const output = await this.sponsorshipFindById.execute({ id });
    return output.toJson();
  }

  async search(searchParams: SponsorshipSearch.Input) {
    const output = await this.sponsorshipSearch.execute(searchParams);
    return new SponsorshipCollectionPresenter(output);
  }
}
