import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { IPostRepository } from "../../../domain/contracts/post-repository.interface";
import { TypePost } from "src/@core/shared/domain/enums/type_post.enum";
import { InvalidStatusError } from "src/@core/shared/domain/errors/invalid-status";
import { RequiredError } from "src/@core/shared/domain/errors/required.error";
import { StatusPost } from "src/@core/shared/domain/enums/status_post.enum";
import { Post } from "src/@core/domain/entities/posts/post";

export namespace PostInactivate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IPostRepository){}

        async execute(input: Input): Output {
            await this.validate(input);

            const postModel = await this.repo.findByIdPost(input.id);

            if (!postModel) {
                throw new NotFoundError('Post not found');
            }

            let post: Post;

            if (+postModel.type === TypePost.ADOPTION) {
                post = await this.repo.findByIdAdoptPost(input.id) as any;
            }else if (+postModel.type === TypePost.SPONSORSHIP) {
                post = await this.repo.findByIdSponsorshipPost(input.id) as any;
            }else{
                throw new InvalidStatusError();
            }

            if (!post) {
                throw new NotFoundError("Post not found");
            }

            post.inactivate(+input.status);
            
            return await this.repo.inactivate(post);
        }

        async validate(input: Input) {
            if(!input.id) throw new RequiredError('id');
            if(!input.status) throw new RequiredError('status');
        }
    }

    export type Input = {
        id: string;
        status: string;
    }

    export type Output = Promise<{
        id: string,
        status: StatusPost
        type: TypePost
    }>;
}
