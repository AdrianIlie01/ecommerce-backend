import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'ecommerce',
      // password: 'ecommerce',
      // database: 'ecommerce',
      // type: 'mysql',
      type: 'postgres',
      url: process.env.url,
      // host: process.env.MYSQL_ADDON_HOST,
      // port: parseInt(process.env.MYSQL_ADDON_PORT, 10),
      // username: process.env.MYSQL_ADDON_USER,
      // password: process.env.MYSQL_ADDON_PASSWORD,
      // database: process.env.MYSQL_ADDON_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ProductsModule,
    MailModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
