import { Model, ModelDefined } from 'sequelize';
import { UserModel } from '../models/User.model';

export class AuthService {
  private userModel!: ModelDefined<any, any>;

  constructor() {
    this.userModel = UserModel;
  }

  async login(username: string): Promise<Model<any, any> | null> {
    try {
      const findByUsername = this.userModel.findOne({
        where: { username },
        include: { all: true },
      });

      return findByUsername;
    } catch (error) {
      throw Error(`Error on login: ${error}`);
    }
  }
}
