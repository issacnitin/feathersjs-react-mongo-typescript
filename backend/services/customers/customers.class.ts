import {Service, MongoDBServiceOptions} from 'feathers-mongodb';
import { Params, Id, NullableId } from '@feathersjs/feathers';
import { Customer } from "./customers.model";

export class CustomerService extends Service {
  constructor(config?: Partial<MongoDBServiceOptions>) {
    super(config);
  }

  async find(params: Params): Promise<any> {
    let options = {
      limit: Number(params!.query!.limit),
      skip: Number(params!.query!.limit) * Number(params!.query!.page)
    }
    let data = await this.Model.find({}, options).toArray();
    let count = Math.ceil((await this.Model.count())/options.limit);
    return {
      data: data,
      maxPage: count
    }
  }

  async get(id: Id, params?: Params): Promise<any> {
    try {
      let customer = await super.get(id);
      customer.orders = params!.data;
      return customer;
    } catch (err) {
      return err;
    }
  }

  async create(data: Partial<Customer>, params: Params): Promise<any> {
    // Create needs auth, add later
    super.create(params.data);
    return true;
  }

  // Not letting PUT call
  async update(id: NullableId, data: Partial<Customer>): Promise<any> {
    return false;
  }
}