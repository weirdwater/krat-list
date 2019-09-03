import { Controller, Post, UsePipes, ValidationPipe, Body, UnauthorizedException, Req, ForbiddenException } from '@nestjs/common';
import { Request } from 'express'
import { AuthService } from './auth.service';
import { AuthenticateUserDTO } from 'src/shared/dto';
import { isNone } from 'src/shared/fun';
import { Session } from './session.entity';
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('api/v1/auth')
@ApiUseTags('authentication')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The authentication attempt was successful' })
  @ApiBadRequestResponse({ description: 'The provided body did not match what expected' })
  @ApiUnauthorizedResponse({ description: 'The authentication attempt failed' })
  @UsePipes(ValidationPipe)
  async authenticate(@Body() credentials: AuthenticateUserDTO, @Req() req: Request): Promise<string> {

    const user = await this.authService.authenticateUser(credentials)

    if (isNone(user)) {
      throw new UnauthorizedException()
    }

    const session = new Session()
    session.user = user.v
    session.ip = req.ip
    return this.authService.create(session)
  }

}
