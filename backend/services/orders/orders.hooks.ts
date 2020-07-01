import express from "@feathersjs/express";
import { HookContext } from "@feathersjs/feathers";

export function hooks(app: express.Application) {
    app.service('orders').hooks({
        before: {
            create: [
                async (context: HookContext) => {
                    
                }
            ],
            patch: [
                async (context: HookContext) => {
                    
                }
            ]
        }
    });
}