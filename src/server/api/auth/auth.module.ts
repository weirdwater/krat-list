import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Session } from './session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { VerificationToken } from './verificationToken.entity';
import { ConfigModule } from 'src/server/config/config.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    TypeOrmModule.forFeature([Session, User, VerificationToken]),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy]
})
export class AuthModule {}
