import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { none, some, Maybe } from 'src/shared/fun';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group)
    private readonly userRepository: Repository<Group>,
  ) {}

  async findOne(u: Partial<Group>): Promise<Maybe<Group>> {
    const user = await this.userRepository.findOne()
    return user === undefined ? none() : some(user)
  }

  save(user: Group): Promise<Group> {
    return this.userRepository.save(user)
  }

}
