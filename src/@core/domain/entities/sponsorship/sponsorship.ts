import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import { StatusSponsorship } from 'src/@core/shared/domain/enums/status_sponsorship.enum';
import SponsorshipProps from './sponsorship-props';

export type SponsorshipAttr = {
  id?: string;
  id_godfather: string;
  id_post: string;
  status?: StatusSponsorship;
  feedback_poster?: string;
  feedback_godfather?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class Sponsorship implements EntityMarker {
  private props: SponsorshipProps;

  constructor(sponsorshipAttr: SponsorshipAttr) {
    this.props = new SponsorshipProps(sponsorshipAttr);
  }

  toJson() {
    return { 
        ...this.props, 
        id: this.id,
        id_godfather: this.id_godfather,
        id_post: this.id_post,
    };
  }

  get feedback_godfather(): string {
    return this.props.feedback_godfather;
  }

  get feedback_poster(): string {
    return this.props.feedback_poster;
  }

  get id_post(): string {
    return this.props.id_post.id;
  }

  get id_godfather(): string {
    return this.props.id_godfather.id;
  }

  get id(): string {
    return this.props.id.id;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  get deleted_at(): Date {
    return this.props.deleted_at;
  }
}
