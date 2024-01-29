import { Sequelize } from 'sequelize';
import { RegisterSQLModels } from '../../models/RegisterSQLModels';
import { ClientFactory } from '../ClientFactory';
import { SQLConfigFactory } from './SQLClientConfigFactory';
import { SQLConfig } from './SQLConfig';

class SQLClientFactory implements ClientFactory<Sequelize> {
  private client: Sequelize;

  constructor(config: SQLConfig) {
    this.client = new Sequelize(config);
  }

  async init(): Promise<Sequelize> {
    try {
      const sqlModels = new RegisterSQLModels(this.client);
      await sqlModels.initializeModels();
      await sqlModels.makeAssosiations();
      await this.client.authenticate().then(() => console.log('DB connection Open'));
      if (process.env.NODE_ENV === 'development') return this.client.sync({ alter: true });
      else return this.client;
    } catch (error) {
      console.log(error);
      throw new Error('Error in the SQL DB setup');
    }
  }

  async finish(): Promise<void> {
    try {
      await this.client.close().then(() => console.log('SQL connection closed'));
    } catch (error) {
      throw new Error('An error happend when connection was closing it');
    }
  }

  async drop(): Promise<void> {
    try {
      await this.client.drop();
    } catch (error) {
      throw new Error('Error when trying to drop mongo db');
    }
  }

  getClient(): Sequelize {
    return this.client;
  }
}

export const sqlClient = new SQLClientFactory(SQLConfigFactory.createConfig());
