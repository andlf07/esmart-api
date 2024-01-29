import { TelemetryService } from '../services/Telemetry.service';
import { Controller } from './Controller';

export class TelemetryController extends Controller {
  constructor() {
    super(new TelemetryService(), 'TelemetryController');
  }
}
