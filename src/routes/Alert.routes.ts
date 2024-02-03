import { Router } from 'express';
import { AlertController } from '../controllers/Alert.controller';
import { RoutesInterface } from '../models/interface/Routes.interface';
import { Routes } from './Routes';

class AlertRoutes extends Routes implements RoutesInterface {
  constructor(path: string) {
    super(path, Router(), new AlertController());
  }
}

export const alertRoutes = new AlertRoutes('/alerts').registerCRUDRoutes();
