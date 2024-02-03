import { AlertService } from '../services/Alert.service';
import { Controller } from './Controller';

export class AlertController extends Controller {
  constructor() {
    super(new AlertService(), 'AlertController');
  }
}
