import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UseGuards, HttpCode, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SearchUserDto } from './dto/search-user.dto';
import { Roles } from 'src/decorator/role.decorator';
import { ROLE } from 'src/constants/user';
import { RolesGuard } from './user.guard';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-new-user')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HttpCode(200)
  @Post('get-all-user')
  findAll(@Body(ValidationPipe) pagination : SearchUserDto) {
    return this.userService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) { 
    return this.userService.remove(id);
  }
  
}
