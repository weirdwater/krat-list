import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'
import { AuthService } from './auth.service';
import { isNone } from '../../../shared/fun';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(token: string) {
    const user = await this.authService.validate(token)

    if (isNone(user)) {
      throw new UnauthorizedException()
    }

    if (!user.v.active) {
      throw new ForbiddenException('User account disabled')
    }

    if (!user.v.emailConfirmed) {
      throw new ForbiddenException('User email not confirmed')
    }

    return user.v
  }
}
