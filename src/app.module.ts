import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalityModule } from './api/personality/personality.module';
import { UsersModule } from './api/users/users.module';
import { PostsModule } from './api/posts/posts.module';

@Module({
  imports: [PersonalityModule, UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
