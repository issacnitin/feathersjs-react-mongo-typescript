import express from "@feathersjs/express";
import { HookContext } from '@feathersjs/feathers';
import { Customer } from "./customers.model";

export function hooks(app: express.Application) {
    app.service('customers').hooks({
        before: {
            get: [
                async (context: HookContext) => {
                    context.params.data = {
                        orders: ["1","2","3"]
                    };
                }
            ]
        }
    })
}