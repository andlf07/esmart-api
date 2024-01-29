import { SensorService } from '../services/Sensor.service';
import { Controller } from './Controller';

export class SensorController extends Controller {
  constructor() {
    super(new SensorService(), 'SensorController');
  }
}
