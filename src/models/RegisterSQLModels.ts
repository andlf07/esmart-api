import { Sequelize } from 'sequelize';
import { AlertModelInitializer } from './Alert.model';
import { SensorModelInitializer } from './Sensor.model';
import { TelemetryModelInitializer } from './Telemetry.model';
import { UserModelInitializer } from './User.model';
import { UserRulesModelInitializer } from './UserRules.model';
import { RegisterModels } from './interface/RegisterModel.interface';

export class RegisterSQLModels implements RegisterModels {
  public client!: Sequelize;
  public sensorModel!: SensorModelInitializer;
  public userModel!: UserModelInitializer;
  public telemetryModel!: TelemetryModelInitializer;
  public userRulesModel!: UserRulesModelInitializer;
  public alertModel!: AlertModelInitializer;

  constructor(client: Sequelize) {
    this.client = client;
    this.sensorModel = new SensorModelInitializer(this.client);
    this.userModel = new UserModelInitializer(this.client);
    this.telemetryModel = new TelemetryModelInitializer(this.client);
    this.userRulesModel = new UserRulesModelInitializer(this.client);
    this.alertModel = new AlertModelInitializer(this.client);
  }

  async initializeModels() {
    this.userModel.initialize();
    this.sensorModel.initialize();
    this.telemetryModel.initialize();
    this.userRulesModel.initialize();
    this.alertModel.initialize();
  }

  async makeAssosiations() {
    this.sensorModel.assosiations();
    this.userModel.assosiations();
    this.telemetryModel.assosiations();
    this.userRulesModel.assosiations();
    this.alertModel.assosiations();
  }
}
