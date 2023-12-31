import {  Module} from '@nestjs/common';
//import { CacheModule } from '@nestjs/cache-manager';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';
import {TypeOrmModule} from '@nestjs/typeorm'
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CityEntity } from './entities/city.entity';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    CacheModule,
    TypeOrmModule.forFeature([CityEntity])],
  providers: [CityService],
  controllers: [CityController],
  exports:[CityService]
})
export class CityModule {}
