import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './users.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    // Check if user with email already exists
    const existingUser = this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role?: string): User[] {
    if (role) {
      return this.usersService.findByRole(role);
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string): User {
    const user = this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
    const user = this.usersService.update(id, updateUserDto);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string): User {
    const user = this.usersService.deactivate(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string): User {
    const user = this.usersService.activate(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const deleted = this.usersService.remove(id);

    if (!deleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'User deleted successfully' };
  }
}
