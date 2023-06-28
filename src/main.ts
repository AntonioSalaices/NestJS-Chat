import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const AppDataSource = new DataSource({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'appchat',
    username: 'admin',
    password: 'admin1234',
  });
  AppDataSource.initialize()
    .then(() => console.log('Database initialized'))
    .catch((error) => {
      console.log('Generic error', error);
    });
}
bootstrap();
