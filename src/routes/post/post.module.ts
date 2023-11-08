import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostProvider } from './post.providers';

@Module({
  controllers: [PostController],
  providers: [PostService,
    PostProvider.Repositories.POST_TYPEORM_REPO,
    PostProvider.Repositories.USER_TYPEORM_REPO,
    PostProvider.Repositories.PERSONALITY_TYPEORM_REPO,
    PostProvider.Repositories.BREED_TYPEORM_REPO,
    PostProvider.Repositories.NEED_TYPEORM_REPO,
    ...Object.values(PostProvider.UseCases)
  ],
})
export class PostModule {}
