import {ObjectId} from 'mongodb';

export class Order {
    _id?: ObjectId;
    customer?: ObjectId;
    product?: String;
    quantity?: Number;
    price?: Number
}