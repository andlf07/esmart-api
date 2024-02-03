import { Request, Response } from 'express';
import { ResponseInterface } from './Response.interface';

export interface AuthControllerInterface {
  login: (req: Request<any, any, any, any>, res: Response) => Promise<Response<ResponseInterface>>;
  getSequelizeError: (error: any) => any;
}
