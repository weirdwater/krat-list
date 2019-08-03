import { Controller, Post, UsePipes, ValidationPipe, Body, UnauthorizedException, Req } from '@nestjs/common';
import { Request } from 'express'
import { AuthService } from './auth.service';
import { AuthenticateUserDTO } from 'src/shared/dto';
import { isNone } from 'src/shared/fun';
import { Session } from './session.entity';

@Controller('api/v1/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post()
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
