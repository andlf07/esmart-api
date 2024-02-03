import { Request, Response } from 'express';
import { AuthControllerInterface } from '../models/interface/AuthController.interface';
import { ResponseInterface } from '../models/interface/Response.interface';
import { AuthService } from '../services/Auth.service';

export class AuthController implements AuthControllerInterface {
  public name!: string;
  public service!: AuthService;

  constructor() {
    this.service = new AuthService();
    this.name = 'Auth Controller';
  }

  async login(
    req: Request<{}, {}, { username: string }, any>,
    res: Response
  ): Promise<Response<ResponseInterface>> {
    const { username } = req.body;
    let response: ResponseInterface = {};

    try {
      const login = await this.service.login(username);

      if (login === null) {
        response.message = 'NOT_EXIST';
        response.statusCode = 401;
        res.statusCode = response.statusCode;
        return res.json(response);
      }

      response.data = login;
      response.message = 'OK';
      response.statusCode = 200;
      res.statusCode = response.statusCode;
      return res.json(response);
    } catch (err: any) {
      const getError = this.getSequelizeError(err);

      if (getError) {
        response = getError;
      } else {
        response.message = 'SERVER_ERROR';

        response.error = `${err.message}`;

        response.statusCode = 500;
      }

      res.statusCode = response.statusCode || 500;

      return res.json(response);
    }
  }

  getSequelizeError(error: any) {
    let response: ResponseInterface = {};

    try {
      const parseError = JSON.parse(error.message);

      // Validation error
      if (parseError.type === 'SequelizeValidationError') {
        response.message = 'BAD_REQUEST';

        response.error = parseError.message;

        response.statusCode = 404;

        return response;
      }
      // Unique Constraint
      if (parseError.type === 'SequelizeUniqueConstraintError') {
        response.message = 'ALREADY_EXIST';

        response.error = parseError.message;

        response.statusCode = 409;

        return response;
      }

      if (parseError.type === 'SequelizeForeignKeyConstraintError') {
        response.message = 'BAD_REQUEST';

        response.error = parseError.message;

        response.statusCode = 404;

        return response;
      }

      if (parseError.type === 'ERROR') {
        response.error = parseError.message;

        response.statusCode = 500;

        return response;
      }
    } catch (error) {
      return null;
    }
  }
}
