import { IsNotEmpty, IsEmail } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class AuthenticateUserDTO {

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  email: string

  @IsNotEmpty()
  @ApiModelProperty()
  password: string

}
