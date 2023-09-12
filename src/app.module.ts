import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalityModule } from './routes/personality/personality.module';
import { UsersModule } from './routes/users/users.module';
import { PostsModule } from './routes/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './core/user/infra/repository/typeorm/user.model';
import { Personality } from '#personality/infra/repository/typeorm/personality.model';

@Module({
  imports: [
    PersonalityModule,
    UsersModule,
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [User, Personality]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
