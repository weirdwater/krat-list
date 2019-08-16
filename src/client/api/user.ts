import { UserSelf, dtoToUserSelf } from "./types";
import { apiUrl } from ".";
import { UnauthorizedException, ApiException } from "./exceptions";

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

  throw new ApiException('Something went wrong fetching the current user')

}
