import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { RolesGuard } from './auth/roles.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalGuards(
  new RolesGuard(
    app.get(Reflector),
  ),
);

  const config = new DocumentBuilder()
    .setTitle('Tree Park Management API')
    .setDescription('API системы учета деревьев')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();