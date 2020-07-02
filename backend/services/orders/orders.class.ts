import {Service, MongoDBServiceOptions} from 'feathers-mongodb';
import { Params, Id, NullableId } from '@feathersjs/feathers';

export class OrderService extends Service {
  constructor(config?: Partial<MongoDBServiceOptions>) {
    super(config);
  }
  
  // Not letting PUT call
  async update(id: NullableId, data: any, params?: Params): Promise<any> {
    return false;
  }

  async find(params: Params): Promise<any> {
    let options = {
      limit: Number(params!.query!.limit),
      skip: Number(params!.query!.limit) * Number(params!.query!.page)
    }
    let query: any = {}

    if(!!params!.query!.customerId) {
      query.customer = params!.query!.customerId;
    }  
    return await this.Model.find(query, options).toArray();
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
