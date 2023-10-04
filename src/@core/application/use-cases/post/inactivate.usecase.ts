// import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
// import UseCase from "../usecase";
// import { IPostRepository } from "../../../domain/contracts/post-repository.interface";

// export namespace AdoptPostInactivate {
//     export class Usecase implements UseCase<Input, Output>{
//         constructor(private repo: IPostRepository){}

//         async execute(input: Input): Output {
//             const post = await this.repo.findByIdAdoptPost(input.id);

//             if (!post) {
//                 throw new NotFoundError("Post not found");
//             }

//             // post.deactivate();
            
//             // return await this.repo.update(user);
//         }
//     }

//     export type Input = {
//         id: string;
//     }

//     export type Output = AdoptPostUpdate.Output
// }
