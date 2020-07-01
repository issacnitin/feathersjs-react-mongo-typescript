import {Service, MongoDBServiceOptions} from 'feathers-mongodb';
import { Params, Id, NullableId } from '@feathersjs/feathers';
import { Customer } from "./customers.model";

export class CustomerService extends Service {
  constructor(config?: Partial<MongoDBServiceOptions>) {
    super(config || {});
  }
  
  async get(id: Id, params?: Params): Promise<any> {
    try {
      let customer = await super.get(id);
      if(!!params) {
        customer.orders = params.data.orders;
      }
      return customer;
    } catch (err) {
      return err;
    }
  }

  async create(data: Partial<Customer>, params?: Params): Promise<any> {
    // Create needs auth, add later
    super.create(params?.data);
    return true;
  }

  async update(id: NullableId, data: Partial<Customer>): Promise<any> {
    return false;
  }

  async patch(id: NullableId, data: Partial<Customer>, params?: Params): Promise<any> {
    try {
      await super.patch(id, data, params);
      return true;
    } catch (err) {
      return err;
    }
  }

  async remove(id: NullableId, params?: Params): Promise<any> {}
}