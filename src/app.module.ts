import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migration/**/*{.ts,.js}'],
      migrationsRun: true
    }),

    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,

    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard
  }],
  controllers: [CartController],
})
export class AppModule {}
