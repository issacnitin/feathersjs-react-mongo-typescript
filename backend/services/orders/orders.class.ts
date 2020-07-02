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

  async find(params?: Params): Promise<any> {
    if(!!params && !!params.query && !!params.query.customerId) {
      return await this.Model.find({
        customer: params!.query!.customerId
      }).toArray();
    }
    return await super.find(params);
  }

  async remove(id: NullableId, params?: Params): Promise<any> {
    if(!!params && !!params.query && !!params.query.customerId) {
      return await this.Model.deleteMany({
        customer: params.query.customerId
      });
    }
    return await super.remove(id, params);
  }
}
