import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/shared/dto';
import { User as UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt'
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.decorator'

@Controller('api/v1/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() dto: CreateUserDTO): Promise<UserEntity> {
    const user = new UserEntity()
    user.email = dto.email
    user.name = dto.name
    user.encryptedPassword = await bcrypt.hash(dto.password, 10)

    return this.userService.save(user)
  }

  @Get('me')
  @UseGuards(AuthGuard())
  self(@User() user: UserEntity): UserEntity {
    return user
  }

}
