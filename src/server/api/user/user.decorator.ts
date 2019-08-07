import { createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

export const CurrentUser = createParamDecorator((data, req) => {
  return req.user as User
})
