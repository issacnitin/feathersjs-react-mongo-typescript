import {Service, MongoDBServiceOptions} from 'feathers-mongodb';
import { Params, Id, NullableId } from '@feathersjs/feathers';
import { Order } from './orders.model';

export class OrderService extends Service {
  constructor(config?: Partial<MongoDBServiceOptions>) {
    super(config);
  }
  
  // Not letting PUT call
  async update(id: NullableId, data: any, params?: Params): Promise<any> {
    return false;
  }
}
