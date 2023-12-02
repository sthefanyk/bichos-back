import {
  SponsorshipFindById,
  SponsorshipSearch,
  SponsorshipUsecase,
} from 'src/@core/application/use-cases/sponsorship';
import { ISponsorshipRepository } from 'src/@core/domain/contracts';
import { Sponsorship } from 'src/@core/domain/entities/sponsorship/sponsorship';
import {
  SponsorshipModel,
  PostModel,
  UserModel,
  NeedModel,
} from 'src/@core/domain/models';
import { DataSource, Repository } from 'typeorm';

export class SponsorshipTypeormRepository implements ISponsorshipRepository {
  private repoSponsorship: Repository<SponsorshipModel>;
  private repoUser: Repository<UserModel>;
  private repoPost: Repository<PostModel>;
  private repoNeed: Repository<NeedModel>;

  constructor(private dataSource: DataSource) {
    this.repoSponsorship = this.dataSource.getRepository(SponsorshipModel);
    this.repoUser = this.dataSource.getRepository(UserModel);
    this.repoPost = this.dataSource.getRepository(PostModel);
    this.repoNeed = this.dataSource.getRepository(NeedModel);
  }

  async findById(id: string): SponsorshipFindById.Output {
    const sponsorship = await this.repoSponsorship.findOne({
      where: { id },
      relations: ['godfather', 'post'],
    });

    return new Sponsorship({
      ...sponsorship,
      status: +sponsorship.status,
      id_godfather: sponsorship.godfather.id,
      id_post: sponsorship.post.id,
    });
  }

  async findAll(): SponsorshipSearch.Output {
    const result = await this.repoSponsorship.find({
      relations: ['godfather', 'post'],
    });

    const sponsorships: Sponsorship[] = [];

    for (const sponsorship of result) {
      sponsorships.push(
        new Sponsorship({
          ...sponsorship,
          status: +sponsorship.status,
          id_godfather: sponsorship.godfather.id,
          id_post: sponsorship.post.id,
        }),
      );
    }

    return sponsorships;
  }

  async sponsorship(entity: Sponsorship): SponsorshipUsecase.Output {
    const [godfather, post] = await Promise.all([
      this.repoUser.findOne({ where: { id: entity.id_godfather } }),
      this.repoPost.findOne({ where: { id: entity.id_post } }),
    ]);

    const sponsorship = await this.repoSponsorship.save({
      ...entity.toJson(),
      godfather,
      post,
    });

    if (!sponsorship) return null;

    const needs = await this.repoNeed.find();

    return {
      id: post.id,
      name: post.contact_name,
      phone: post.contact_phone,
      email: post.contact_email,
      city: post.contact_city,
      needs: needs.map((need) => need.name),
      urgent: post.urgent,
    };
  }
}
