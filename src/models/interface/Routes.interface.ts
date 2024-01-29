import { Router } from 'express';

export interface RoutesInterface {
  registerCRUDRoutes(): Router;
}
