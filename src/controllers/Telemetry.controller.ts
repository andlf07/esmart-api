import { Request, Response } from 'express';
import { ResponseInterface } from '../models/interface/Response.interface';
import { NotificationService } from '../services/Notification.service';
import { SensorService } from '../services/Sensor.service';
import { TelemetryService } from '../services/Telemetry.service';
import { Controller } from './Controller';
import { RulesEngineController } from './RulesEngine.controller';

export class TelemetryController extends Controller {
  private sensorService!: SensorService;
  private rulesEngine!: RulesEngineController;
  private notificationService!: NotificationService;

  constructor() {
    super(new TelemetryService(), 'TelemetryController');
    this.sensorService = new SensorService();
    this.rulesEngine = new RulesEngineController();
    this.notificationService = new NotificationService();
  }

  async create(req: Request, res: Response): Promise<Response<ResponseInterface>> {
    const { topic, ...restData } = req.body;

    let response: ResponseInterface = {};

    try {
      //Get sensor by topic
      const getSensorByTopic: any = await this.sensorService.getSensorByTopicOne(topic);

      if (getSensorByTopic === null) throw Error('Sensor doesnt existe');

      restData.sensor_id = getSensorByTopic?.id;

      const sensorRules = getSensorByTopic.rules;

      // Loop each rule
      sensorRules.forEach(async (rule: any) => {
        const sensorRule = {
          fact: rule.fact,
          operator: rule.operator,
          value: parseInt(rule.value),
        };

        const ruleFact = rule.fact;
        let rulesValues: any = {};

        rulesValues[ruleFact] = restData[rule.checkKey];

        // Check rule with RulesEngine
        const checkingRules = await this.rulesEngine.checkRule(sensorRule, rulesValues);

        //If there is an alert send notification
        if (checkingRules.length >= 1) {
          for (const alertRule of checkingRules) {
            this.notificationService.sendNotification(alertRule.message);
          }
        }
      });

      // registry telemetry
      const create = await this.service.create(restData);

      response.message = 'CREATED';

      response.data = create;

      response.statusCode = 201;

      res.statusCode = response.statusCode;

      return res.json(response);
    } catch (err: any) {
      const getError = this.getSequelizeError(err);

      if (getError) {
        response = getError;
      } else {
        response.message = 'SERVER_ERROR';

        response.error = `${err.message}`;

        response.statusCode = 500;
      }

      res.statusCode = response.statusCode || 500;

      return res.json(response);
    }
  }
}
