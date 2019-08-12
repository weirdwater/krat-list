import { IsNotEmpty, IsEmail, IsDate, IsUUID } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class UserSelfDTO {

  @IsUUID('4')
  @IsNotEmpty()
  @ApiModelProperty()
  id: string

  @IsNotEmpty()
  @ApiModelProperty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  email: string

  @IsNotEmpty()
  @ApiModelProperty()
  avatar: string

  @IsDate()
  @IsNotEmpty()
  @ApiModelProperty()
  created: Date

  @IsDate()
  @IsNotEmpty()
  @ApiModelProperty()
  updated: Date

}