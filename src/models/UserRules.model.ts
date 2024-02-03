import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SensorModel } from './Sensor.model';
import { ModelInitializer } from './interface/ModelInitializer.interface';

export interface UserRulesAttributes {
  id?: number;
  fact?: string;
  operator?: string;
  value?: any;
  description?: string;
  checkKey?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRulesCreationAttributes extends Optional<UserRulesAttributes, 'id'> {}

export class UserRulesModel extends Model<UserRulesAttributes, UserRulesCreationAttributes> {
  public id!: number;
  public fact!: string;
  public operator!: string;
  public value!: any;
  public description!: string;
  public checkKey!: string;
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
        fact: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          validate: {
            notEmpty: {
              msg: 'fact cant be empty',
            },
          },
        },
        operator: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          validate: {
            notEmpty: {
              msg: 'operator cant be empty',
            },
          },
        },
        value: {
          allowNull: false,
          type: new DataTypes.STRING(128),
          validate: {
            notEmpty: {
              msg: 'value cant be empty',
            },
          },
        },
        description: {
          allowNull: true,
          type: new DataTypes.TEXT(),
        },
        checkKey: {
          allowNull: false,
          type: new DataTypes.TEXT(),
          validate: {
            notEmpty: {
              msg: 'value cant be empty',
            },
          },
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
  assosiations(): void {
    UserRulesModel.belongsTo(SensorModel, {
      foreignKey: {
        name: 'sensor_id',
        allowNull: true,
      },
      as: 'sensor',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}
