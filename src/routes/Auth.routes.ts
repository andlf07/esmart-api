import { Request, Response, Router } from 'express';
import { AuthController } from '../controllers/Auth.controller';

export interface IRoutes {
  registerCRUDRoutes(): any;
}

export class AuthRoutes {
  public path!: string;
  public router!: Router;
  public controller!: AuthController;

  constructor(path: string, router: Router, controller: AuthController) {
    this.path = path;
    this.router = router;
    this.controller = controller;
  }

  registerCRUDRoutes(): Router {
    const router = this.router;

    router.post(this.path + '/login', (req: Request, res: Response) =>
      this.controller.login(req, res)
    );

    return this.router;
  }
}

export const authRoutes = new AuthRoutes(
  '/auth',
  Router(),
  new AuthController()
).registerCRUDRoutes();
