import {Service, MongoDBServiceOptions} from 'feathers-mongodb';
import { Params, Id, NullableId } from '@feathersjs/feathers';
import { Order } from './orders.model';

export class OrderService extends Service {
  constructor(config?: Partial<MongoDBServiceOptions>) {
    super(config);
  }
  
  async create(data: Partial<Order>, params: Params): Promise<any> {
    return await super.create({ ...new Order(data), timestamp: new Date()});
  }

  async patch(id: NullableId, data: any, params: Params): Promise<any> {
    return await super.patch(id, new Order(data));
  }

  async update(id: NullableId, data: any, params?: Params): Promise<any> {
    return false;
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
