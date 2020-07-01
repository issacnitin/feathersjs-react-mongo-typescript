import { CustomerService } from "./customers/customers.class";
import express from "@feathersjs/express";
import { MongoClient, MongoClientCommonOption, MongoClientOptions } from "mongodb";

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
    })
    .catch((error) => console.error(error));
}
