import { Controller, Param, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';



@Roles(UserType.User)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Roles(UserType.User)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: number,
    ): Promise<AddressEntity> {
        console.log('userId', userId)
        return this.addressService.createAddress(createAddressDto, userId);
    }
}

