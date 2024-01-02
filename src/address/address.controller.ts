import { Body, Controller , Get,  Post , UsePipes , ValidationPipe} from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dtos/createAddress.dto";
import { AddressEntity } from "./entities/address.entity";
import { Roles } from '../decorators/roles.decorator';
import { UserId } from "src/decorators/user-id.decorator";
import { ReturnAddressDto } from "./dtos/returnAddress.dto";
import { UserType } from "src/user/enum/user-type.enum";


@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  
  @Post()
  @UsePipes(ValidationPipe)
  
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number  
  ): Promise<AddressEntity>{
    return this.addressService.createAddress(createAddressDto, userId)
  }

  @Get()
  async findAddressByUserId(
    @UserId() userId: number,
  ):Promise<ReturnAddressDto[]>{
    return (await this.addressService.findAddressByUserId(userId)).map(
      (address)=> new ReturnAddressDto(address)
    )
  }

}