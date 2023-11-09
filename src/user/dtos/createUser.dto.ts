import { IsString, Matches } from 'class-validator';

export class CreateUserDto {
    // @Matches(/^[a-zA-ZÀ-Úá-ú .]+$/)name: string

    @IsString() name: string;

    @IsString() email: string;

    @IsString() phone: string;

    @IsString() cpf: string;

    @IsString() password: string;
}