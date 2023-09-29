import { Post } from "../entities/posts/post";
import { PublishPost } from "src/@core/application/use-cases/post/publish-post.usecase";

export interface IPostRepository {
    publishPost(entity: Post): PublishPost.Output;
}