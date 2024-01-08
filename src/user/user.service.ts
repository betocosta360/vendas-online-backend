import { Injectable, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { hash } from 'bcrypt'
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dtos/update-passoword.dto';
import { createPasswordHashed, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) { }

  
  async createUSer(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(() => undefined)
    if (user) {
      throw new BadGatewayException('email já registrado no sistema')
    }

    const passwordhashed = await createPasswordHashed(
      createUserDto.password
    )

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      password: passwordhashed
    })
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: {
        address: {
          city: {
            state: true
          }
        }
      }
    })
  }


  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }
  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} usuário não encontrado`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }

    return user;
  }

  async updatePasswordUser(
    updatePasswordDTO: UpdatePasswordDTO,
    userId: number
  ): Promise<UserEntity>{
    const user = await this.findUserById(userId)

    const passwordhashed = await createPasswordHashed(
      updatePasswordDTO.newPassword
    )

    const IsMatch = await validatePassword(
      updatePasswordDTO.lastPassword,
      user.password || ''
    )
    if(!IsMatch){
      throw new BadRequestException('Senha antiga invalida')
    }
    return this.userRepository.save({
      ...user,
      password: passwordhashed
    })
  }

}
