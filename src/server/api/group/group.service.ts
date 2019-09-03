import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { none, some, Maybe } from 'src/shared/fun';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMember } from './groupMember.entity';

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMember)
    private readonly memberRepository: Repository<GroupMember>,
  ) {}

  async findOne(u: Partial<Group>): Promise<Maybe<Group>> {
    const user = await this.groupRepository.findOne()
    return user === undefined ? none() : some(user)
  }

  save(user: Group): Promise<Group> {
    return this.groupRepository.save(user)
  }

  async getMembers(group: Group): Promise<GroupMember[]> {
    return this.memberRepository.find({
      where: { group },
      relations: ['member']
    })
  }

}
