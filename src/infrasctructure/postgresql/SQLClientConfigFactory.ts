import { serverConfig } from '../../configs/server.config';
import { SQLConfig } from './SQLConfig';

export class SQLConfigFactory {
  static createConfig(): SQLConfig {
    return {
      pool: {
        max: 10,
        min: 0,
        idle: 1000,
        evict: 25000,
      },
      dialectOptions: {
        decimalNumbers: true,
        ssl: true,
        // ssl: serverConfig.MODE === 'development' ? false : true,
      },
      dialect: 'postgres',
      host: `${serverConfig.DB_DOMAIN}`,
      port: serverConfig.DB_PORT,
      username: `${serverConfig.DB_USER}`,
      password: `${serverConfig.DB_PASSWORD}`,
      database: `${serverConfig.DB_NAME}`,
    };
  }
}
