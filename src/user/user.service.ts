import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {hash} from 'bcrypt'
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>){}

  
    async createUSer(CreateUserDto: CreateUserDto):Promise<UserEntity>{
        const saltOrRounds = 10
        const passwordhashed = await hash(CreateUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...CreateUserDto,
            typeUser:1,
            password: passwordhashed
        })
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity>{
        return this.userRepository.findOne({
            where:{
                id: userId
            },
            relations: ['address']
        })
    }
    async getAllUser():Promise<UserEntity[]>{
        return this.userRepository.find()
    }
    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
          where: {
            id: userId,
          },
        });
    
        if (!user) {
          throw new NotFoundException(`UserId: ${userId} Not Found`);
        }
    
        return user;
      }
}
