import { Injectable, UnauthorizedException } from '@nestjs/common'
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

    return user.v
  }
}
