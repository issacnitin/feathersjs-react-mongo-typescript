import {Service, MongoDBServiceOptions} from 'feathers-mongodb';
import { Params, Id, NullableId } from '@feathersjs/feathers';
import { Order } from './orders.model';

export class OrderService extends Service {
  constructor(config?: Partial<MongoDBServiceOptions>) {
    super(config);
  }

  
  async create(data: Partial<Order>, params?: Params): Promise<any> {
    try {
      await super.create(data);
      return true;
    } catch (err) {
      return err;
    }
  }

  async update(id: NullableId, data: any, params?: Params): Promise<any> {
    if(!id) {
      return "Id cannot be null";
    }
    try {
      await super.remove(id, params);
      return true;
    } catch(err) {
      return err;
    }
  }

  async remove(id: NullableId, params?: Params): Promise<any> {
    if(!id) {
      return "Id cannot be null";
    }
    try {
      await super.remove(id, params);
      return true;
    } catch(err) {
      return err;
    }
  }
}
