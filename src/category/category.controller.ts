import { Controller, Get, Post, UsePipes, Body, ValidationPipe, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategory } from './dtos/returnCategoty.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CreateCategory } from './dtos/createCategory.dto';
import { CategoryEntity } from './entities/category.entity';
import { UpdateCategory } from './dtos/update-category.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin, UserType.Root, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.findAllCategories();
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Put(':categoryId')
  async editCategory(
    @Param('categoryId') categoryId: number,
    @Body() updateCategory: UpdateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.editCategory(categoryId, updateCategory);
  }

  @Get(':categoryId')
  async findCategoryById(
    @Param('categoryId') categoryId: number,
  ): Promise<ReturnCategory> {
    return new ReturnCategory(
      await this.categoryService.findCategoryById(categoryId, true),
    );
  }
}
