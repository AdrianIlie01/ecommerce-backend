import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ['x-forwarded-for'],
    origin: [
      process.env.ORIGIN,
      'https://ecommerce-frontend-t5lt.onrender.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'X-Requested-With',
      'Content-Type',
      'Authorization',
      'Origin',
      'Accept',
    ],
  });

  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://ecommerce-frontend-t5lt.onrender.com',
    );
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
