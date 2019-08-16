import { UserSelfDTO } from "../../shared/dto";
import { Maybe, none, some } from "../../shared/fun";
import moment from 'moment'

export interface UserSelf {
  id: string
  name: string
  email: string
  avatar: Maybe<string>
  created: moment.Moment
  updated: moment.Moment
}

export const dtoToUserSelf = (dto: UserSelfDTO): UserSelf => ({
  ...dto,
  avatar: dto.avatar === null ? none() : some(dto.avatar),
  created: moment(dto.created),
  updated: moment(dto.updated)
})
