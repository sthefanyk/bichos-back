import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalityModule } from './routes/personality/personality.module';
import { UsersModule } from './routes/users/users.module';
import { PostsModule } from './routes/posts/posts.module';
// import { AuthModule } from './routes/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './routes/person/person.module';
import { LocalizationModule } from './routes/localization/localization.module';

@Module({
  imports: [
    PersonalityModule,
    UsersModule,
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/aaa.sqlite',
      synchronize: true,
      logging: false,
      entities: [`${__dirname}/**/models/*.{ts,js}`]
    }),
    PersonModule,
    LocalizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
