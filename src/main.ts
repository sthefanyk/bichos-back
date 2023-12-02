import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomErrorFilter } from './errors/error-filter';
import { CustomError } from './@core/shared/domain/errors/error.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomErrorFilter<CustomError>());

  const config = new DocumentBuilder()
    .setTitle('API Bichos')
    .setDescription('The Bichos API routes')
    .setVersion('1.0')
    .addTag('person')
    .addTag('shelter')
    .addTag('auth')
    .addTag('localization')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
