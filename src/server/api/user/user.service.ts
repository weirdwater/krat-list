import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { none, some, Maybe } from 'src/shared/fun';
import { UserWithEmailExistsException } from 'src/server/exceptions/userWithEmailExists.exception';
import { GroupMember } from '../group/groupMember.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(GroupMember)
    private readonly memberRepository: Repository<GroupMember>,
  ) {}

  async findOne(u: Partial<User>): Promise<Maybe<User>> {
    const user = await this.userRepository.findOne(u)
    return user === undefined ? none() : some(user)
  }

  async save(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user)
    } catch (e) {
      if (e.name && e.name === 'QueryFailedError' && e.constraint && (e.constraint as string).substr(0, 2) === 'UQ') {
        throw new UserWithEmailExistsException(`A user with the email ${user.email} already exists.`)
      }
      throw e
    }
  }

  getGroups(user: User): Promise<GroupMember[]> {
    return this.memberRepository.find({
      where: { member: user },
      relations: [ 'group' ]
    })
  }

}
