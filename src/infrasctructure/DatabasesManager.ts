import Logger from "./Logger";
import { sqlClient } from "./postgresql/SQLClientFactory";

export class DatabasesManager {
  constructor(private logger: Logger) {}

  async openConnection(): Promise<void> {
    try {
      await Promise.all([sqlClient.init()]).then(() =>
        this.logger.info("Databases initialized correctly")
      );
    } catch (error) {
      console.log(error);
      throw new Error(
        "Something was wrong on databases open connections process"
      );
    }
  }

  async closeConnection(): Promise<void> {
    try {
      await Promise.all([sqlClient.finish()]).then(() =>
        this.logger.info("Databases connection closed correctly")
      );
    } catch (error) {
      throw new Error(
        "Something was wrong on databases close connections process"
      );
    }
  }

  async drop(): Promise<void> {
    try {
      await Promise.all([sqlClient.drop()]).then(() =>
        this.logger.info("Databases dropped correctly")
      );
    } catch (error) {
      throw new Error("Something was wrong dropping databases");
    }
  }
}
