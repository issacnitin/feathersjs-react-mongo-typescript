import { CustomerService } from "./customers/customers.class";
import express from "@feathersjs/express";
import { MongoClient } from "mongodb";

export function register(app: express.Application<any>) {
  app.use("/customers", new CustomerService());

  MongoClient.connect("mongodb://localhost:27017/", {useUnifiedTopology: true})
    .then(function (client) {
      // Set the model now that we are connected
      app.service("customers").Model = client
        .db("torre")
        .collection("customers");
    })
    .catch((error) => console.error(error));
}
