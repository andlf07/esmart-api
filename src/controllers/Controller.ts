import { Request, Response } from 'express';
import { ControllerInterface } from '../models/interface/Controller.interface';
import { ResponseInterface } from '../models/interface/Response.interface';
import { Service } from '../services/Service';
import { pagination } from '../utils/pagination.util';

export class Controller implements ControllerInterface {
  public name!: string;
  public service!: Service;

  constructor(service: Service, name: string) {
    this.service = service;
    this.name = name;
  }

  async getAll(req: Request<{}, {}, {}, any>, res: Response): Promise<Response<ResponseInterface>> {
    let response: ResponseInterface = {};
    const query = req.query;

    const { page = 1, pageSize = 12 } = query;

    const { page: pageNumber, pageSize: sizePage } = pagination({ page, pageSize });

    try {
      const { data, count, totalPages } = await this.service.getAll({
        page: pageNumber,
        pageSize: sizePage,
      });

      response.data = data;

      response.pagination = {
        count: count,
        page: pageNumber,
        pageSize,
        totalPages,
      };
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

  async updateOne(req: Request, res: Response): Promise<Response<ResponseInterface>> {
    const { body, params } = req;
    let response: ResponseInterface = {};

    try {
      const update = await this.service.update(body, params.id);
      if (update === null) {
        response.message = 'NOT_FOUND';

        response.statusCode = 404;

        res.statusCode = response.statusCode;

        return res.json(response);
      }
      response.message = 'OK';

      response.data = update;

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

  async getOne(req: Request, res: Response): Promise<Response<ResponseInterface>> {
    const { params } = req;

    let response: ResponseInterface = {};

    try {
      const getOne = await this.service.getOne(params.id);

      if (getOne === null) {
        response.message = 'NOT_FOUND';

        response.statusCode = 404;

        res.statusCode = response.statusCode;

        return res.json(response);
      }

      response.message = 'OK';

      response.data = getOne;

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

  async create(req: Request, res: Response): Promise<Response<ResponseInterface>> {
    const { body } = req;

    let response: ResponseInterface = {};

    try {
      const create = await this.service.create(body);

      response.message = 'CREATED';

      response.data = create;

      response.statusCode = 201;

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

  async delete(req: Request, res: Response): Promise<Response<ResponseInterface>> {
    const { params } = req;

    let response: ResponseInterface = {};

    try {
      await this.service.delete(params.id);

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
