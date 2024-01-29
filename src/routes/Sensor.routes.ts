import { Router } from 'express';
import { SensorController } from '../controllers/Sensor.controller';
import { RoutesInterface } from '../models/interface/Routes.interface';
import { Routes } from './Routes';

class SensorRoutes extends Routes implements RoutesInterface {
  constructor(path: string) {
    super(path, Router(), new SensorController());
  }
}

export const sensorRoutes = new SensorRoutes('/sensors').registerCRUDRoutes();
