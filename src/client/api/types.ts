import { UserSelfDTO } from "../../shared/dto";
import { Maybe, none, some } from "../../shared/fun";

export interface UserSelf {
  id: string
  name: string
  email: string
  avatar: Maybe<string>
  created: Date
  updated: Date
}

export const dtoToUserSelf = (dto: UserSelfDTO): UserSelf => ({
  ...dto,
  avatar: dto.avatar === null ? none() : some(dto.avatar)
})
