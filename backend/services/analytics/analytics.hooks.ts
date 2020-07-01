import express from "@feathersjs/express";
import { HookContext, Hook } from '@feathersjs/feathers';
import { MongoClient, Collection } from "mongodb";

export function analyticsHooks(app: express.Application) {
    app.service('analytics').hooks({
        before: {
            find: [
                async (context: HookContext) => {
                    let aggregationPipeline = [
                        { 
                            $group: {
                                _id: { $dayOfMonth: "$timestamp" },
                                count: { $sum: 1},
                                sum: { 
                                    $sum: {
                                        $multiply: ["$price", "$quantity"] 
                                    } 
                                } 
                            } 
                        },
                        {
                            $replaceWith: {
                                day: "$_id",
                                count: "$count",
                                sum: "$sum"
                            }
                        }
                    ];
                    let data = await (app.service('orders').Model as Collection).aggregate(aggregationPipeline).toArray();
                    context.params = {
                        data: data
                    };
                }
            ]
        }
    })
}