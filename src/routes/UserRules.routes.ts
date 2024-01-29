import { Router } from 'express';
import { UserRulesController } from '../controllers/UserRules.controller';
import { RoutesInterface } from '../models/interface/Routes.interface';
import { Routes } from './Routes';

class UserRulesRoutes extends Routes implements RoutesInterface {
  constructor(path: string) {
    super(path, Router(), new UserRulesController());
  }
}

export const userRulesRoutes = new UserRulesRoutes('/user-rules').registerCRUDRoutes();
