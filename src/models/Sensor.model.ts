import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { TelemetryModel } from './Telemetry.model';
import { UserModel } from './User.model';
import { ModelInitializer } from './interface/ModelInitializer.interface';

export interface SensorAttributes {
  id?: number;
  topic?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SensorCreationAttributes extends Optional<SensorAttributes, 'id'> {}

export class SensorModel extends Model<SensorAttributes, SensorCreationAttributes> {
  public id!: number;
  public topic!: string;
  public enabled!: boolean;
  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

export class SensorModelInitializer implements ModelInitializer {
  constructor(private client: Sequelize) {}

  initialize(): void {
    SensorModel.init(
      {
        id: {
          primaryKey: true,
          type: new DataTypes.UUID(),
          defaultValue: DataTypes.UUIDV4(),
          unique: true,
        },
        topic: {
          type: new DataTypes.TEXT(),
          unique: true,
          allowNull: false,
        },
        enabled: {
          type: new DataTypes.BOOLEAN(),
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize: this.client,
        modelName: 'Sensor',
        tableName: 'sensors',
        timestamps: true,
      }
    );
  }
  assosiations(): void {
    SensorModel.belongsTo(UserModel, {
      foreignKey: {
        name: 'user_id',
        allowNull: true,
      },
      as: 'user',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    SensorModel.hasMany(TelemetryModel, {
      foreignKey: {
        name: 'sensor_id',
        allowNull: true,
      },
      as: 'telemetryRecords',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}
