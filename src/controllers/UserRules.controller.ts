import { UserRulesService } from '../services/UserRules.service';
import { Controller } from './Controller';

export class UserRulesController extends Controller {
  constructor() {
    super(new UserRulesService(), 'UserRulesController');
  }
}
