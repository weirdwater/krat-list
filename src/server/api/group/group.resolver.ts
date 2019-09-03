import { Resolver, Args, Query } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { isSome } from 'src/shared/fun';

@Resolver(of => Group)
export class GroupResolver {

  constructor(private readonly groupService: GroupService) {}

  @Query(returns => Group)
  async group(@Args('id') id: string) {
    const g = await this.groupService.findOne({ id })
    return isSome(g) ? g.v : undefined
  }

}
