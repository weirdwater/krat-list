import { Some } from '../../../src/shared/fun'
import { apiUrl } from '.';
import { UserSelf, dtoToUserSelf } from './types';
import { UserSelfDTO } from '../../shared/dto';
import { BadRegistrationRequestException, ApiException, BadAuthenticationRequestException } from './exceptions';


export const registerUser = async (formData: { email: Some<string>, password: Some<string>, name: Some<string> }): Promise<UserSelf> => {

  const res = await fetch(apiUrl('user'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
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

export const authenticateUser = async (formData: { email: Some<string>, password: Some<string> }): Promise<string> => {

  const res = await fetch(apiUrl('auth'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: formData.email.v,
      password: formData.password.v
    })
  })

  if (res.ok) {
    return await res.text()
  }

  if (res.status === 400) {
    const error = await res.json()
    throw new BadAuthenticationRequestException('The provided authentication data is incorrect or incomplete', error.message)
  }

  throw new ApiException('Something went wrong authenticating the user')

}
