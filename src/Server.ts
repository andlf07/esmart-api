import express from 'express';
import helmet from 'helmet';
import * as http from 'http';
import morgan from 'morgan';
import { serverConfig } from './configs/server.config';
import Logger from './infrasctructure/Logger';
import { router } from './routes';

export class Server {
  private express: express.Express;
  private httpServer?: http.Server;
  private logger: Logger;
  private port: string;

  constructor(port: string, logger: Logger) {
    this.port = port;
    this.express = express();
    this.logger = logger;

    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(serverConfig.API_PREFIX, router);

    this.express.use(
      morgan('combined', {
        stream: {
          write: (message: string) => this.logger.info(message.trim()),
        },
      })
    );
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `App is running at http://localhost:${this.port} in ${serverConfig.MODE} mode`
        );
        this.logger.info('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer(): http.Server | undefined {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
