import * as M from 'mongodb';

export class Order {
    customer: M.ObjectID;
    product: String;
    quantity: Number;
    price: Number

    constructor() {
        this.customer = new M.ObjectID();
        this.product = "";
        this.quantity = 0;
        this.price = 0;
    }
}