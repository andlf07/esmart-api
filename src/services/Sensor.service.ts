import { SensorModel } from '../models/Sensor.model';
import { Service } from './Service';

export class SensorService extends Service {
  constructor() {
    super(SensorModel, 'Sensor');
  }
}
