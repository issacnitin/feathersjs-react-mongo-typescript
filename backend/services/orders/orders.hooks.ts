import express from "@feathersjs/express";
import { HookContext } from "@feathersjs/feathers";
import { Order } from "./orders.model";

export function ordersHooks(app: express.Application) {
    app.service('orders').hooks({
        before: {
            create: [
                async (context: HookContext) => {
                    context.data = {...new Order(context.data), timestamp: new Date()};
                }
            ],
            patch: [
                async (context: HookContext) => {
                    context.data = new Order(context.data);
                }
            ]
        }
    });
}