import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Bierlijst')
    .setDescription('The API description for the to be named beer app.')
    .setVersion('1.0')
    .addTag('authentication')
    .addTag('users')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.useStaticAssets(join(__dirname, '..', '..', 'static'))

  await app.listen(3000);
}
bootstrap();
