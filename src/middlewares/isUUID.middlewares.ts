import { NextFunction, Request, Response } from 'express';
import { ResponseInterface } from '../models/interface/Response.interface';

export const isUUID = (req: Request, res: Response, next: NextFunction) => {
  let response: ResponseInterface = {};

  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (regexExp.test(req.params.id)) next();
  else {
    response.message = 'Check the id parameter, it is invalid';

    response.error = 'BAD_REQUEST';

    response.statusCode = 404;

    res.statusCode = response.statusCode;

    return res.json(response);
  }
};
