import { TelemetryModel } from '../models/Telemetry.model';
import { Service } from './Service';

export class TelemetryService extends Service {
  constructor() {
    super(TelemetryModel, 'Telemetry');
  }
}
