import { Router } from 'express';
import { TelemetryController } from '../controllers/Telemetry.controller';
import { RoutesInterface } from '../models/interface/Routes.interface';
import { Routes } from './Routes';

class TelemetryRoutes extends Routes implements RoutesInterface {
  constructor(path: string) {
    super(path, Router(), new TelemetryController());
  }
}

export const telemetryRoutes = new TelemetryRoutes('/telemetry').registerCRUDRoutes();
