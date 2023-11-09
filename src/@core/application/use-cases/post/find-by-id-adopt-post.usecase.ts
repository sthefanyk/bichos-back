import UseCase from "../usecase";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import {IPostRepository} from "../../../domain/contracts/post-repository.interface";
import { Post } from "src/@core/domain/entities/posts/post";

export namespace FindByIdAdoptPost {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPostRepository){}
    
        async execute(input: Input): Output {
            const post = await this.repo.findByIdAdoptPost(input.id);

            if (!post) {
                throw new NotFoundError("Post not found");
            }

            return post;
        }
    }
    
    export type Input = {
        id: string
    }
    
    export type Output = Promise<Post>
}


