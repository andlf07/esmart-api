import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { ModelInitializer } from './interface/ModelInitializer.interface';

export interface UserRulesAttributes {
  id?: number;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRulesCreationAttributes extends Optional<UserRulesAttributes, 'id'> {}

export class UserRulesModel extends Model<UserRulesAttributes, UserRulesCreationAttributes> {
  public id!: number;
  public email!: string;
  public password!: string;
  public enabled!: boolean;
  public readonly createdAt!: string;
  public readonly updated_at!: string;
}

export class UserRulesModelInitializer implements ModelInitializer {
  constructor(private client: Sequelize) {}

  initialize(): void {
    UserRulesModel.init(
      {
        id: {
          primaryKey: true,
          type: new DataTypes.UUID(),
          defaultValue: DataTypes.UUIDV4(),
          unique: true,
        },
        enabled: {
          type: new DataTypes.BOOLEAN(),
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize: this.client,
        modelName: 'UserRules',
        tableName: 'user_rules',
        timestamps: true,
      }
    );
  }
  assosiations(): void {}
}
