import { CustomerService } from "./customers/customers.class";
import express from "@feathersjs/express";
import { MongoClient, MongoClientCommonOption, MongoClientOptions } from "mongodb";

export function register(app: express.Application<any>) {
  app.use("/customers", new CustomerService());

  let options : MongoClientOptions = {
    auth: {
      user: "issacnitinmongod",
      password: "iPhoneMyPh0ne!!"
    },
    useUnifiedTopology: true
  }
  MongoClient.connect("mongodb://mongo:27017/", options)
    .then(function (client) {
      // Set the model now that we are connected
      app.service("customers").Model = client
        .db("torre")
        .collection("customers");
    })
    .catch((error) => console.error(error));
}
