import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SensorModel } from './Sensor.model';
import { ModelInitializer } from './interface/ModelInitializer.interface';

export interface TelemetryAttributes {
  id?: number;
  timestamp?: string;
  temperature?: number;
  humidity?: number;
  flow?: number;
  pressure?: number;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TelemetryCreationAttributes extends Optional<TelemetryAttributes, 'id'> {}

export class TelemetryModel extends Model<TelemetryAttributes, TelemetryCreationAttributes> {
  public id!: number;
  public timestamp!: string;
  public temperature!: number;
  public humidity!: number;
  public flow!: number;
  public pressure!: number;
  public enabled!: boolean;
  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

export class TelemetryModelInitializer implements ModelInitializer {
  constructor(private client: Sequelize) {}

  initialize(): void {
    TelemetryModel.init(
      {
        id: {
          primaryKey: true,
          type: new DataTypes.UUID(),
          defaultValue: DataTypes.UUIDV4(),
          unique: true,
        },
        timestamp: {
          type: new DataTypes.INTEGER(),
          allowNull: false,
        },
        temperature: {
          type: new DataTypes.FLOAT(),
          allowNull: true,
        },
        humidity: {
          type: new DataTypes.FLOAT(),
          allowNull: true,
        },
        flow: {
          type: new DataTypes.FLOAT(),
          allowNull: true,
        },
        pressure: {
          type: new DataTypes.FLOAT(),
          allowNull: true,
        },
        enabled: {
          type: new DataTypes.BOOLEAN(),
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize: this.client,
        modelName: 'Telemetry',
        tableName: 'telemetries',
        timestamps: true,
      }
    );
  }
  assosiations(): void {
    TelemetryModel.belongsTo(SensorModel, {
      foreignKey: {
        name: 'sensor_id',
        allowNull: false,
      },
      as: 'sensor',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}
