import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  email: string

  @IsNotEmpty()
  @ApiModelProperty()
  name: string

  @IsNotEmpty()
  @ApiModelProperty()
  password: string
}
