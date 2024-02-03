import { AlertModel } from '../models/Alert.model';
import { Service } from './Service';

export class AlertService extends Service {
  constructor() {
    super(AlertModel, 'Alert');
  }
}
