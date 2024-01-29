import { Request, Response } from 'express';
import { ResponseInterface } from './Response.interface';

export interface ControllerInterface {
  getAll: (req: Request<any, any, any, any>, res: Response) => Promise<Response<ResponseInterface>>;
  updateOne: (req: Request, res: Response) => Promise<Response>;
  getOne: (req: Request, res: Response) => Promise<Response<ResponseInterface>>;
  create: (req: Request, res: Response) => Promise<Response<ResponseInterface>>;
  delete: (req: Request, res: Response) => Promise<Response<ResponseInterface>>;
  getSequelizeError: (error: any) => any;
}
