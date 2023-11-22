import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './routes/person/person.module';
import { LocalizationModule } from './routes/localization/localization.module';
import { ShelterModule } from './routes/shelter/shelter.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { dataSourceOptions } from './database/data-source';
import { NGOModule } from './routes/ngo/ngo.module';
import { PostModule } from './routes/post/post.module';
import { BreedModule } from './routes/breed/breed.module';
import { PersonalityModule } from './routes/personality/personality.module';
import { NeedModule } from './routes/need/need.module';
import { QuizModule } from './routes/quiz/quiz.module';
import { AdoptModule } from './routes/adopt/adopt.module';
import { SponsorshipModule } from './routes/sponsorship/sponsorship.module';
import { UserModule } from './routes/user/user.module';
import { GalleryModule } from './routes/gallery/gallery.module';

@Module({
  imports: [
    GalleryModule,
    UserModule,
    SponsorshipModule,
    AdoptModule,
    QuizModule,
    NeedModule,
    PersonalityModule,
    BreedModule,
    AuthModule,
    PersonModule,
    LocalizationModule,
    ShelterModule,
    NGOModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRoot({
      transport: {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
        }
      },
      defaults: {
        from: '"API Bichos" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



