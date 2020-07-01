import {ObjectId} from 'mongodb';

export class Order {
    customer?: ObjectId;
    product?: String;
    quantity?: Number;
    price?: Number

    constructor(obj: any) {
        this.customer = obj.customer;
        this.product = obj.product;
        this.quantity = obj.quantity;
        this.price = obj.price;
    }
}