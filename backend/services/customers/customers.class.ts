import {Service, MongoDBServiceOptions} from 'feathers-mongodb';
import { Params, Id, NullableId } from '@feathersjs/feathers';

export class CustomerService extends Service {
  constructor(config?: Partial<MongoDBServiceOptions>) {
    super(config || {});
  }
  
  async get(id: Id, params?: Params): Promise<any> {
    console.log("get called")
  }
  async create(data: Partial<any> | Array<Partial<any>>, params?: Params): Promise<any> {
    console.log("create callaaed")
  }
  async update(id: NullableId, data: any, params?: Params): Promise<any> {}
  async remove(id: NullableId, params?: Params): Promise<any> {}
}
