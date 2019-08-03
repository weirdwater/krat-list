import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Maybe, none, some } from 'src/shared/fun';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Session } from './session.entity';
import { AuthenticateUserDTO } from '../../../shared/dto'
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

}
