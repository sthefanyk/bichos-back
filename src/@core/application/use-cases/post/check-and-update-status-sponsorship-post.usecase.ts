import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import UseCase from '../usecase';
import { Post } from 'src/@core/domain/entities/posts/post';
import { StatusPostSponsorship } from 'src/@core/shared/domain/enums/status_post_sponsorship.enum';

export namespace CheckAndUpdateStatusSponsorshipPost {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IPostRepository) {}

    async execute(): Output {
      const posts: Post[] = await this.repo.findActivesSponsorshipPost();

      const current_date = new Date();
      const one_weeks = 7 * 24 * 60 * 60 * 1000;
      // const min = 1 * 60 * 1000; // 1 min

      posts.forEach((post) => {
        const status = post.animal.getStatus();

        if (
          status === StatusPostSponsorship.WAITING_GODFATHER &&
          !post.urgent &&
          current_date.getTime() - post.latest_status_update.getTime() >
            2 * one_weeks
        ) {
          post.animal.updateStatus(StatusPostSponsorship.WAITING_RENEWAL);
          post.setLatestStatusUpdate();
        }

        if (
          status === StatusPostSponsorship.WAITING_GODFATHER &&
          post.urgent &&
          current_date.getTime() - post.latest_status_update.getTime() >
            one_weeks
        ) {
          post.animal.updateStatus(StatusPostSponsorship.WAITING_RENEWAL);
          post.setLatestStatusUpdate();
        }

        if (
          current_date.getTime() - post.latest_status_update.getTime() >
          8 * one_weeks
        ) {
          post.animal.updateStatus(StatusPostSponsorship.TIME_CLOSURE);
          post.setLatestStatusUpdate();
          post.inactivate();
        }

        console.log(post.animal.getStatus());
      });

      await this.repo.updateStatusSponsorshipPost(posts);
    }
  }

  export type Input = null;

  export type Output = Promise<void>;
}
