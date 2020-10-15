import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvVariables } from './infrastructure/configuration/environment/env-variables.emun';
import { FilterBussinesException } from './infrastructure/exceptions/FilterBussinesException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FilterBussinesException())

  app.setGlobalPrefix(configService.get(EnvVariables.APPLICATION_CONTEXT_PATH));  
  await app.listen(configService.get(EnvVariables.APPLICATION_PORT));
}
bootstrap();
