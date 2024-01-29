import { Router } from 'express';
import { UserController } from '../controllers/User.controller';
import { RoutesInterface } from '../models/interface/Routes.interface';
import { Routes } from './Routes';

class UserRoutes extends Routes implements RoutesInterface {
  constructor(path: string) {
    super(path, Router(), new UserController());
  }
}

export const usersRoutes = new UserRoutes('/users').registerCRUDRoutes();
