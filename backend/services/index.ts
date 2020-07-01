import { CustomerService } from "./customers/customers.class";
import express from "@feathersjs/express";
import { MongoClient, MongoClientCommonOption, MongoClientOptions } from "mongodb";
import { OrderService } from "./orders/orders.class";
import { hooks } from "./customers/customers.hooks";
import { AnalyticsService } from "./analytics/analytics.class";
import { analyticsHooks } from "./analytics/analytics.hooks";

export function register(app: express.Application<any>) {

  let options : MongoClientOptions = {
    auth: {
      user: "issacnitinmongod",
      password: "iPhoneMyPh0ne"
    },
    useUnifiedTopology: true
  }
  MongoClient.connect("mongodb://127.0.0.1:27017/", options)
    .then(async function (client) {
      app.use("/customers", new CustomerService({
        Model: client.db("torre").collection("customers")
      }));
      client.db("torre").collection("customers").createIndex("email", {unique: true}, (err, res) => {
        console.log(err);
        console.log(res);
      });
      hooks(app);

      app.use("/orders", new OrderService({
        Model: client.db("torre").collection("orders")
      }));

      app.use('/analytics', new AnalyticsService({
        Model: client.db("torre").collection("analytics")
      }));
      analyticsHooks(app);
    })
    .catch((error) => console.error(error));
}
