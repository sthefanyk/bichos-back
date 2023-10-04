import { FindByIdAdoptPost } from "src/@core/application/use-cases/post/find-by-id-adopt-post.usecase";
import { Post } from "../entities/posts/post";
import { PublishAdoptPost, PublishSponsorshipPost, FindAllAdoptPost, FindAllSponsorshipPost } from "src/@core/application/use-cases/post";
import { FindByIdSponsorshipPost } from "src/@core/application/use-cases/post/find-by-id-sponsorship-post.usecase";
import { PostInactivate } from "src/@core/application/use-cases/post/inactivate-adopt-post.usecase";
import PostModel from "../models/post.model";

export interface IPostRepository {
    publishAdoptPost(entity: Post): PublishAdoptPost.Output;
    publishSponsorshipPost(entity: Post): PublishSponsorshipPost.Output;
    findAllAdoptPost(): FindAllAdoptPost.Output;
    findAllSponsorshipPost(): FindAllSponsorshipPost.Output;
    findByIdAdoptPost(id: string): FindByIdAdoptPost.Output;
    findByIdSponsorshipPost(id: string): FindByIdSponsorshipPost.Output;
    findByIdPost(id: string): Promise<PostModel>;
    inactivate(entity: Post): PostInactivate.Output;
}