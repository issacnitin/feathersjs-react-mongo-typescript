import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Params, Id, NullableId } from "@feathersjs/feathers";
import express from "@feathersjs/express";
import { Collection } from "mongodb";

export class AnalyticsService extends Service {
  app?: express.Application;

  constructor(config?: Partial<MongoDBServiceOptions>, app?: express.Application) {
    super(config);
    this.app = app;  
  }

  async find(params: Params): Promise<any> {
    if(!this.app) return false;
    let aggregationPipeline = [
        { 
            $group: {
                _id: { $dayOfMonth: "$timestamp" },
                count: { $sum: 1},
                price: "$price",
                quantity: "$quantity"
            } 
        },
        {
            $replaceWith: {
                day: "$_id",
                count: "$count",
                sum: {$multiply: ["$price", "$quantity"]}
            }
        }
    ];
    let data = await (this.app.service('orders').Model as Collection).aggregate(aggregationPipeline).toArray();
    return data;
  }

  async create(data: Partial<any>, params?: Params): Promise<any> {
    return false;
  }
  
  async update(
    Id: NullableId,
    data: Partial<any>,
    params?: Params
  ): Promise<any> {
    return false;
  }

  async patch(
    Id: NullableId,
    data: Partial<any>,
    params?: Params
  ): Promise<any> {
    return false;
  }

  async get(
    Id: NullableId,
    data: Partial<any>,
    params?: Params
  ): Promise<any> {
    return false;
  }

  async remove(
    Id: NullableId,
    data: Partial<any>,
    params?: Params
  ): Promise<any> {
    return false;
  }
}
