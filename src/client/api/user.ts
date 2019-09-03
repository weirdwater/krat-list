import { UserSelf, dtoToUserSelf } from "./types";
import { apiUrl } from ".";
import { UnauthorizedException, ApiException, EmailNotConfirmedException, UserDeactivatedException } from "./exceptions";
import { ApiErrorDTO } from "../../shared/dto";

export const self = async (sessionToken: string): Promise<UserSelf> => {

  const res = await fetch(apiUrl('user/me'), {
    headers: {
      'Authorization': `Bearer ${sessionToken}`
    }
  })

  if (res.ok) {
    return dtoToUserSelf(await res.json())
  }

  if (res.status === 401) {
    throw new UnauthorizedException('Cannot current user if not authorized.')
  }

  if (res.status === 403) {
    const error = await res.json() as ApiErrorDTO
    if (error.message === 'User email not confirmed') {
      throw new EmailNotConfirmedException('User email has not been confirmed.')
    }
    if (error.message === 'User account disabled') {
      throw new UserDeactivatedException('User account has been deactivated.')
    }
  }

  throw new ApiException('Something went wrong fetching the current user')

}
