import { UserService } from '../services/User.service';
import { Controller } from './Controller';

export class UserController extends Controller {
  constructor() {
    super(new UserService(), 'UserController');
  }
}
