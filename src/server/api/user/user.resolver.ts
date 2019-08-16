import { User } from "./user.entity";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { isSome } from "src/shared/fun";

@Resolver(of => User)
export class UserResolver {

  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async user(@Args('id') id: string) {
    const u = await this.userService.findOne({ id });
    return isSome(u) ? u.v : undefined
  }
}
