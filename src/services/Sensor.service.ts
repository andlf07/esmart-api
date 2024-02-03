import { Model } from 'sequelize';
import { SensorModel } from '../models/Sensor.model';
import { Service } from './Service';

export class SensorService extends Service {
  constructor() {
    super(SensorModel, 'Sensor');
  }

  async getSensorByTopicOne(topic: string): Promise<Model<any, any> | null> {
    try {
      const getOne = await this.model.findOne({
        where: { topic },
        include: { all: true },
      });

      return getOne;
    } catch (error: any) {
      throw new Error(`Error on getSensorByTopicOne: ${this.modelName}`);
    }
  }
}
