import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/shared/dto';
import { User as UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt'
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './user.decorator'
import { ApiUseTags, ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('api/v1/user')
@ApiUseTags('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The user was created successfuly' })
  @ApiBadRequestResponse({ description: 'The provided body did not match what expected' })
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
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successfuly retrieved the authenticated user' })
  @ApiUnauthorizedResponse({ description: 'User not authenticated (properly)' })
  @UseGuards(AuthGuard())
  self(@CurrentUser() user: UserEntity): UserEntity {
    return user
  }

}
