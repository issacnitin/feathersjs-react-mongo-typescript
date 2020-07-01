import { Service, MongoDBServiceOptions } from "feathers-mongodb";
import { Params, Id, NullableId } from "@feathersjs/feathers";

export class AnalyticsService extends Service {
  constructor(config?: Partial<MongoDBServiceOptions>) {
    super(config);
  }

  async find(params: Params): Promise<any> {
    return params.data;
  }
}
