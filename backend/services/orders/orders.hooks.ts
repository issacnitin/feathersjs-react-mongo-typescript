import express from "@feathersjs/express";
import { HookContext } from "@feathersjs/feathers";
import { Order } from "./orders.model";

export function ordersHooks(app: express.Application) {
    app.service('orders').hooks({
        before: {
            find: [
                async (context: HookContext) => {
                    if(!context.params) {
                        context.params = {};
                    }
                    if(!context.params.query) {
                        context.params.query = {};
                    }
                    if(!context.params.query.limit || isNaN(context.params.query.limit)) {
                        context.params.query.limit = 25;
                    }
                    if(!context.params.query.page || isNaN(context.params.query.page)) {
                        context.params.query.page = 0;
                    }
                }
            ],
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