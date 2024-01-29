import { UserModel } from '../models/User.model';
import { Service } from './Service';

export class UserService extends Service {
  constructor() {
    super(UserModel, 'User');
  }
}
