import { ConfigService } from './config.service'
import { ConnectionOptions } from 'typeorm'

export const dbConfigFactory = async (configService: ConfigService): Promise<ConnectionOptions> => ({
  type: 'postgres',
  host: configService.postgresHost,
  port: configService.postgresPort,
  username: configService.postgresUser,
  password: configService.postgresPassword,
  database: configService.postgresDatabase,
  entities: [ __dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js' ],
  synchronize: configService.typeOrmSync,
})
