import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConnectionOptions } from 'typeorm';

export const dbConfigFactory = async (configService: ConfigService): Promise<ConnectionOptions> => ({
  type: 'postgres',
  host: configService.postgresHost,
  port: configService.postgresPort,
  username: configService.postgresUser,
  password: configService.postgresPassword,
  database: configService.postgresDatabase,
  entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
  synchronize: configService.typeOrmSync,
})

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: dbConfigFactory,
      inject: [ConfigService],
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
