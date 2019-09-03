import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { GroupResolver } from './group.resolver';
import { GroupMember } from './groupMember.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupMember]),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    AuthModule
  ],
  providers: [GroupService, GroupResolver]
})
export class GroupModule {}
