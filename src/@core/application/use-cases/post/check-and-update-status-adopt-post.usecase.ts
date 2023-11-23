import { IPostRepository } from "src/@core/domain/contracts/post-repository.interface";
import UseCase from "../usecase";
import { Post } from "src/@core/domain/entities/posts/post";
import { StatusPostAdopt } from "src/@core/shared/domain/enums/status_post_adopt.enum";

export namespace CheckAndUpdateStatusAdoptPost {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPostRepository){}
    
        async execute(): Output {
            const posts: Post[] = await this.repo.findAllAdoptPost();

            const current_date = new Date();
            const one_weeks = 7 * 24 * 60 * 60 * 1000;
            // const min = 1 * 60 * 1000; // 1 min

            posts.forEach(post => {
                console.log(post.animal.getStatus());
                // const updated_date = new Date(post.latest_status_update);

                const status = post.animal.getStatus();
                
                if (
                    status === StatusPostAdopt.WAITING_QUESTIONNAIRES &&
                    !post.urgent &&
                    (current_date.getTime() - post.latest_status_update.getTime()) > (2 * one_weeks)
                ) {
                    post.animal.updateStatus(StatusPostAdopt.WAITING_EVALUATION);
                    post.setLatestStatusUpdate();
                }

                if (
                    status === StatusPostAdopt.WAITING_QUESTIONNAIRES &&
                    post.urgent &&
                    (current_date.getTime() - post.latest_status_update.getTime()) > one_weeks
                ) {
                    post.animal.updateStatus(StatusPostAdopt.WAITING_EVALUATION);
                    post.setLatestStatusUpdate();
                }

                if (
                    status === StatusPostAdopt.WAITING_EVALUATION &&
                    (current_date.getTime() - post.latest_status_update.getTime()) > one_weeks
                ) {
                    post.animal.updateStatus(StatusPostAdopt.WAITING_RENEWAL);
                    post.setLatestStatusUpdate();
                }

                if ((current_date.getTime() - post.latest_status_update.getTime()) > (8 * one_weeks)) {
                    post.animal.updateStatus(StatusPostAdopt.TIME_CLOSURE);
                    post.setLatestStatusUpdate();
                    post.inactivate();
                }
                console.log(post.animal.getStatus());
            });


            await this.repo.updateStatusAdoptPost(posts);
        }
    }
    
    export type Input = null
    
    export type Output = Promise<void>
}