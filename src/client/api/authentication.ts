import { Some } from '../../../src/shared/fun'
import { apiUrl } from '.';
import { UserSelf, dtoToUserSelf } from './types';
import { UserSelfDTO } from '../../shared/dto';
import { BadRegistrationRequestException, ApiException } from './exceptions';


export const registerUser = async (formData: { email: Some<string>, password: Some<string>, name: Some<string> }): Promise<UserSelf> => {

  const res = await fetch(apiUrl('user'), {
    method: 'post',
    body: JSON.stringify({
      email: formData.email.v,
      password: formData.password.v,
      name: formData.name.v
    })
  })

  if (res.ok) {
    const dto: UserSelfDTO = await res.json()
    return dtoToUserSelf(dto)
  }

  if (res.status === 400) {
    const error = await res.json()
    throw new BadRegistrationRequestException('The provided registration data is incomplete or unexpected', error.message)
  }

  throw new ApiException('Something went wrong creating an account')
}
