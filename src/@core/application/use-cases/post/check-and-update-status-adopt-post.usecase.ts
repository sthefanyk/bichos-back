import { IPostRepository } from "src/@core/domain/contracts/post-repository.interface";
import UseCase from "../usecase";
import { Post } from "src/@core/domain/entities/posts/post";

export namespace CheckAndUpdateStatusAdoptPost {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPostRepository){}
    
        async execute(): Output {
            const posts: Post[] = await this.repo.findAllAdoptPost();

            posts.forEach(post => {
                post.checkStatus();
            });

            await this.repo.updateStatusAdoptPost(posts);
        }
    }
    
    export type Input = null
    
    export type Output = Promise<void>
}


