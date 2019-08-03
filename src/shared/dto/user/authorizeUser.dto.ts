import { IsNotEmpty, IsEmail } from "class-validator";

export class AuthenticateUserDTO {

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

}
