import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './user.resolver';
import { GroupMember } from '../group/groupMember.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, GroupMember]),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
