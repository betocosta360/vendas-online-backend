import { Body, Controller,  Post, Get } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post ()
    async createUser( @Body()createUser : createUserDto):Promise<UserEntity>{ 
      return  this.userService.createUSer(createUser)
    }
    @Get()
    async getAllUser():Promise<UserEntity[]>{
return this.userService.getAllUser()
    }
}
