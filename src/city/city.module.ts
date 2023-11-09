import {  Module} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import {TypeOrmModule} from '@nestjs/typeorm'
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [CacheModule.register(),

    TypeOrmModule.forFeature([CityEntity])],

  providers: [CityService],
  controllers: [CityController]
})
export class CityModule {}
