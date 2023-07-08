import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import * as cors from 'cors';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:5174',
    credentials: true,
  };
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(cors(corsOptions));
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
