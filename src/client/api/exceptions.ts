import { ValidationError } from 'class-validator'

export class ApiException extends Error {

  constructor(m: string) {
    super(m)
    this.name = 'ApiException'
  }

}

export class BadApiRequestException extends ApiException {
  validationErrors: ValidationError[]

  constructor(m: string, v: ValidationError[]) {
    super(m)
    this.name = 'BadApiRequestException'
    this.validationErrors = [...v]
  }
}

export class BadRegistrationRequestException extends BadApiRequestException {

  constructor(m: string, v: ValidationError[]) {
    super(m, v)
    this.name = 'BadRegistrationDataException'
  }

}

export class BadAuthenticationRequestException extends BadApiRequestException {

  constructor(m: string, v: ValidationError[]) {
    super(m, v)
    this.name = 'BadAuthenticationRequestException'
  }

}

export class UnauthorizedException extends ApiException {

  constructor(m: string) {
    super(m)
    this.name = 'UnauthorizedException'
  }

}

