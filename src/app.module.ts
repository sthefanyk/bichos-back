import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalityModule } from './routes/personality/personality.module';
import { PostsModule } from './routes/posts/posts.module';
import { AuthModule } from './routes/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './routes/person/person.module';
import { LocalizationModule } from './routes/localization/localization.module';
import { ShelterModule } from './routes/shelter/shelter.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    PersonalityModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/aaa.sqlite',
      synchronize: true,
      logging: false,
      entities: [`${__dirname}/**/models/*.{ts,js}`]
    }),
    PersonModule,
    LocalizationModule,
    ShelterModule,
    MailerModule.forRoot({
      transport: {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "",
          pass: ""
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}