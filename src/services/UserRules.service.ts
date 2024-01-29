import { UserRulesModel } from '../models/UserRules.model';
import { Service } from './Service';

export class UserRulesService extends Service {
  constructor() {
    super(UserRulesModel, 'UserRules');
  }
}
