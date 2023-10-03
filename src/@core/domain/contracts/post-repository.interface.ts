import { Post } from "../entities/posts/post";
import { PublishAdoptPost, PublishSponsorshipPost } from "src/@core/application/use-cases/post";

export interface IPostRepository {
    publishAdoptPost(entity: Post): PublishAdoptPost.Output;
    publishSponsorshipPost(entity: Post): PublishSponsorshipPost.Output;
    // getAdoptionListings(): PublishPost.Output;
    // getSponsorshipListings(): PublishPost.Output;
    // getPostById(id: string): PublishPost.Output;
    // getPostByPosterId(id: string): PublishPost.Output;
}