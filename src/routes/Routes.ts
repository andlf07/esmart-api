import { Request, Response, Router } from 'express';
import { isUUID } from '../middlewares/isUUID.middlewares';
import { ControllerInterface } from '../models/interface/Controller.interface';

export interface IRoutes {
  registerCRUDRoutes(): any;
}

export class Routes {
  public path!: string;
  public router!: Router;
  public controller!: ControllerInterface;

  constructor(path: string, router: Router, controller: ControllerInterface) {
    this.path = path;
    this.router = router;
    this.controller = controller;
  }

  registerCRUDRoutes(): Router {
    const router = this.router;

    router.get(this.path, (req: Request, res: Response) => this.controller.getAll(req, res));

    router.get(this.path + '/:id', [isUUID], (req: Request, res: Response) =>
      this.controller.getOne(req, res)
    );

    router.post(this.path, (req: Request, res: Response) => this.controller.create(req, res));

    router.put(this.path + '/:id', [isUUID], (req: Request, res: Response) =>
      this.controller.updateOne(req, res)
    );

    router.delete(this.path + '/:id', [isUUID], (req: Request, res: Response) =>
      this.controller.delete(req, res)
    );

    return this.router;
  }
}
