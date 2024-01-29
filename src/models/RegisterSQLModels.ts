import { Sequelize } from 'sequelize';
import { SensorModelInitializer } from './Sensor.model';
import { TelemetryModelInitializer } from './Telemetry.model';
import { UserModelInitializer } from './User.model';
import { RegisterModels } from './interface/RegisterModel.interface';

export class RegisterSQLModels implements RegisterModels {
  public client!: Sequelize;
  public sensorModel!: SensorModelInitializer;
  public userModel!: UserModelInitializer;
  public telemetryModel!: TelemetryModelInitializer;

  constructor(client: Sequelize) {
    this.client = client;
    this.sensorModel = new SensorModelInitializer(this.client);
    this.userModel = new UserModelInitializer(this.client);
    this.telemetryModel = new TelemetryModelInitializer(this.client);
  }

  async initializeModels() {
    this.sensorModel.initialize();
    this.telemetryModel.initialize();
    this.userModel.initialize();
  }

  async makeAssosiations() {
    this.userModel.assosiations();
    this.sensorModel.assosiations();
    this.telemetryModel.assosiations();
  }
}
