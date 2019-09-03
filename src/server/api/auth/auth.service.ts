import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Maybe, none, some } from 'src/shared/fun';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Session } from './session.entity';
import { AuthenticateUserDTO } from '../../../shared/dto'
import * as bcrypt from 'bcrypt'
import { VerificationToken, VerificationTokenType } from './verificationToken.entity';
import { ConfigService } from 'src/server/config/config.service';


@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(VerificationToken)
    private readonly tokenRepository: Repository<VerificationToken>,
  ) {}

  async authenticateUser(credentials: AuthenticateUserDTO): Promise<Maybe<User>> {
    const user = await this.userRepository.findOne({ email: credentials.email })
    if (user === undefined) {
      return none()
    }

    const matches = await bcrypt.compare(credentials.password, user.encryptedPassword)
    if (matches) {
      return some(user)
    }

    return none()
  }

  async validate(id: string): Promise<Maybe<User>> {
    const session = await this.sessionRepository.findOne({ id }, { relations: ['user'] })

    if (session === undefined) {
      return none()
    }

    if (session.user) {
      return some(session.user)
    }

    return none()
  }

  async create(session: Session): Promise<string> {
    const pSession = await this.sessionRepository.save(session)
    return pSession.id
  }

  deAuth(id: string): Promise<DeleteResult> {
    return this.sessionRepository.delete({ id })
  }

  private createToken(type: VerificationTokenType) {
    return async (user: User): Promise<string> => {
      const t0 = await this.tokenRepository.findOne({ type, user })
      if (t0) {
        await this.tokenRepository.remove(t0)
      }
      const t1 = new VerificationToken()
      t1.user = user
      t1.type = type
      const t2 = await this.tokenRepository.save(t1)
      return t2.token
    }
  }

  createPasswordResetToken(user: User): Promise<string> {
    return this.createToken('password')(user)
  }

  createEmailVerificationToken(user: User): Promise<string> {
    return this.createToken('email')(user)
  }

  async verifyToken(token: string, email: string): Promise<boolean> {
      const t = await this.tokenRepository.findOne({ token }, { relations: [ 'user' ]})

      if (t === undefined) {
        return false
      }

      if (t.user.email !== email) {
        return false
      }

      const timeDiff = Date.now() - t.created.valueOf()
      if (timeDiff > this.configService.verificationTokenExpirationTimeout) {
        return false
      }

      return true
  }

  async retireToken(token: string) {
    const t = await this.tokenRepository.findOne({ token })
    this.tokenRepository.remove(t)
  }

}
