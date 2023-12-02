import {
  SponsorshipFindById,
  SponsorshipSearch,
  SponsorshipUsecase,
} from '../../application/use-cases/sponsorship';
import { Sponsorship } from '../entities/sponsorship/sponsorship';

export interface ISponsorshipRepository {
  sponsorship(entity: Sponsorship): SponsorshipUsecase.Output;
  findById(id: string): SponsorshipFindById.Output;
  findAll(): SponsorshipSearch.Output;
}
