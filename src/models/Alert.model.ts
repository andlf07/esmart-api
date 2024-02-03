import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SensorModel } from './Sensor.model';
import { ModelInitializer } from './interface/ModelInitializer.interface';

export interface AlertAttributes {
  id?: number;
  description?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AlertCreationAttributes extends Optional<AlertAttributes, 'id'> {}

export class AlertModel extends Model<AlertAttributes, AlertCreationAttributes> {
  public id!: number;
  public description!: string;
  public enabled!: boolean;
  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

export class AlertModelInitializer implements ModelInitializer {
  constructor(private client: Sequelize) {}

  initialize(): void {
    AlertModel.init(
      {
        id: {
          primaryKey: true,
          type: new DataTypes.UUID(),
          defaultValue: DataTypes.UUIDV4(),
          unique: true,
        },
        description: {
          type: new DataTypes.TEXT(),
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
        modelName: 'Alert',
        tableName: 'telemetries',
        timestamps: true,
      }
    );
  }
  assosiations(): void {
    AlertModel.belongsTo(SensorModel, {
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
