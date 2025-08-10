import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ['x-forwarded-for'],
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'X-Requested-With',
      'Content-Type',
      'Origin',
    ],
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
