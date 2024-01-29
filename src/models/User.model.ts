import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SensorModel } from './Sensor.model';
import { ModelInitializer } from './interface/ModelInitializer.interface';

export interface UserAttributes {
  id?: number;
  email?: string;
  password?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public email!: string;
  public password!: string;
  public enabled!: boolean;
  public readonly createdAt!: string;
  public readonly updated_at!: string;
}

export class UserModelInitializer implements ModelInitializer {
  constructor(private client: Sequelize) {}

  initialize(): void {
    UserModel.init(
      {
        id: {
          primaryKey: true,
          type: new DataTypes.UUID(),
          defaultValue: DataTypes.UUIDV4(),
          unique: true,
        },

        email: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          unique: true,
          validate: {
            notEmpty: {
              msg: 'email cant be empty',
            },
            isEmail: {
              msg: 'email has to be a valid email',
            },
          },
        },
        password: {
          allowNull: false,
          type: new DataTypes.STRING(128),
        },
        enabled: {
          type: new DataTypes.BOOLEAN(),
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize: this.client,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
  }
  assosiations(): void {
    UserModel.hasMany(SensorModel, {
      foreignKey: {
        name: 'user_id',
        allowNull: true,
      },
      as: 'sensors',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}
