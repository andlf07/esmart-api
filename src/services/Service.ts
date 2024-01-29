import { Model, ModelDefined } from 'sequelize';
import { Pagination } from '../models/interface/Pagination.interface';

export class Service {
  public model: ModelDefined<any, any>;
  public modelName: string;

  constructor(model: ModelDefined<any, any>, modelName: string) {
    this.model = model;
    this.modelName = modelName;
  }

  async getAll(
    pagination: Pagination
  ): Promise<{ data: Model<any, any>[]; count: number; totalPages: number }> {
    let { page, pageSize } = pagination;
    const offset = (page - 1) * pageSize;

    try {
      const { rows, count } = await this.model.findAndCountAll({
        limit: pageSize,
        offset,
      });

      return {
        data: rows,
        count: count,
        totalPages: Math.ceil(count / pageSize),
      };
    } catch (error: any) {
      throw new Error(`Error on getAll: ${error.message}`);
    }
  }
  async getOne(userId: string): Promise<Model<any, any> | null> {
    try {
      const getOne = await this.model.findOne({
        where: { id: userId },
        include: { all: true },
      });

      return getOne;
    } catch (error: any) {
      throw new Error(`Error on getOne: ${this.modelName}`);
    }
  }
  async create(data: any): Promise<Model<any, any>> {
    try {
      const create = await this.model.create(data);
      return create;
    } catch (error: any) {
      if (error.name === 'SequelizeForeignKeyConstraintError')
        throw new Error(
          JSON.stringify({
            type: error.name,
            message: error.parent.detail,
          })
        );
      if (error.errors)
        throw new Error(
          JSON.stringify({
            type: error.name,
            message: error.errors[0].message,
          })
        );

      throw new Error(
        JSON.stringify({
          type: 'ERROR',
          message: 'SERVER_ERROR',
        })
      );
    }
  }
  async update(data: any, fieldId: string): Promise<Model<any, any>> {
    try {
      const update = await this.model.update(
        { ...data },
        {
          where: { id: fieldId },
          returning: true,
        }
      );

      return update[1][0];
    } catch (error: any) {
      if (error.name === 'SequelizeForeignKeyConstraintError')
        throw new Error(
          JSON.stringify({
            type: error.name,
            message: error.parent.detail,
          })
        );

      throw new Error(
        JSON.stringify({
          type: error.name,
          message: error.errors[0].message,
        })
      );
    }
  }
  async delete(userId: string): Promise<number> {
    try {
      const deleteOne = await this.model.destroy({
        where: { id: userId },
      });

      return deleteOne;
    } catch (error: any) {
      throw new Error(`Error on delete: ${this.modelName}`);
    }
  }
}
