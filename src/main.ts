import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const dataSource = app.get(DataSource);

  await dataSource.runMigrations();

  await app.listen(3000);
}
bootstrap();

/*
User model, company model, 
use both inside employee model


1. Company -> seed data
2. create user while creating employee

//Advantage of data modelling -> need to add

Time off policy enigine - rules

Good to have - position model, can be used for head count planning 
*/
