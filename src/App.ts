import { Server } from './Server';
import { serverConfig } from './configs/server.config';
import { DatabasesManager } from './infrasctructure/DatabasesManager';
import Logger from './infrasctructure/Logger';
import WinstonLogger from './infrasctructure/WistonLogger';

export class App {
  server?: Server;
  logger?: Logger;
  dbManager: DatabasesManager;

  constructor() {
    const port = serverConfig.SERVER_PORT;
    this.logger = new WinstonLogger();
    this.server = new Server(port, this.logger);
    this.dbManager = new DatabasesManager(this.logger);
  }

  async start() {
    try {
      await this.server?.listen();
      await this.dbManager.openConnection();
    } catch (error) {
      this.logger?.error(error as string);
    }
  }

  async stop() {
    await this.dbManager.drop();
    await this.dbManager.closeConnection();
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }
}
