import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [UserModule, AuthModule, GroupModule]
})
export class ApiModule {}
