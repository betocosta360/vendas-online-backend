import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {hash} from 'bcrypt'
import { createUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  createUser(createUser: createUserDto): UserEntity | PromiseLike<UserEntity> {
    throw new Error('Method not implemented.');
  }
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
