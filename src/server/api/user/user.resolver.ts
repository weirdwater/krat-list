import { User } from "./user.entity";
import { Resolver, Query, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { isSome } from "src/shared/fun";
import { GroupMember } from "../group/groupMember.entity";

@Resolver(of => User)
export class UserResolver {

  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async user(@Args('id') id: string) {
    const u = await this.userService.findOne({ id });
    return isSome(u) ? u.v : undefined
  }

  @ResolveProperty()
  groups(@Parent() user: User): Promise<GroupMember[]> {
    return this.userService.getGroups(user)
  }

}
