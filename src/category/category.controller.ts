import { Controller, Get,Post,UsePipes,Body,ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/returnCategoty.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { CategoryEntity } from './entities/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    async findAllCategories():Promise<ReturnCategoryDto[]>{
        return (await this.categoryService.findAllCategories()).map(
            (category)=> new ReturnCategoryDto(category)
        );
    }
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async CreateCategoryDto(
        @Body()CreateCategoryDto: CreateCategoryDto
    ): Promise<CategoryEntity>{
        return this.categoryService.createCategoryDto(CreateCategoryDto)
    }
}
