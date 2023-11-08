import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {hash} from 'bcrypt'
import { createUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>){}

  
    async createUSer(createUserDto: createUserDto):Promise<UserEntity>{
        const saltOrRounds = 10
        const passwordhashed = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            typeUser:1,
            password: passwordhashed
        })

    }
    async getAllUser():Promise<UserEntity[]>{
        return this.userRepository.find()
    }
}
