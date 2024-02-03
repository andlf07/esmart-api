import { Engine } from 'json-rules-engine';
import { Rule } from '../models/interface/Rule.interface';

export class RulesEngineController {
  private engine!: Engine;

  constructor() {
    this.engine = new Engine();
  }

  async checkRule(rule: Rule, telemetry: any): Promise<any> {
    this.engine.addRule({
      conditions: {
        any: [
          {
            all: [{ ...rule }],
          },
        ],
      },
      event: {
        type: 'Alert',
        params: {
          message: `New alert with the rule: ${rule.fact}`,
        },
      },
    });

    return await this.engine.run(telemetry).then(({ events, results }) => {
      return events.map(event => {
        return {
          type: event.type,
          message: event.params?.message,
        };
      });
    });
  }
}
