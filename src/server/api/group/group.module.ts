import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    AuthModule
  ],
  providers: [GroupService]
})
export class GroupModule {}
