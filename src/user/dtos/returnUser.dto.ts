import { ReturnAddressDto } from '../../address/dtos/returnAddress.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  addresses?: ReturnAddressDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.password = userEntity.password

    this.addresses = userEntity.address
      ? userEntity.address.map((address) => new ReturnAddressDto(address))
      : undefined;
  }
}