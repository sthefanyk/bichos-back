import { IPostRepository } from "src/@core/domain/contracts/post-repository.interface";
import UseCase from "../usecase";
import { Post } from "src/@core/domain/entities/posts/post";

export namespace FindAllAdoptPost {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPostRepository){}
    
        async execute(): Output {
            return await this.repo.findAllAdoptPost();
        }
    }
    
    export type Input = null
    
    export type Output = Promise<Post[]>
}


