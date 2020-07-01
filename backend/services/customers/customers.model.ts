import { ObjectId } from "mongodb";

export class Customer {
    firstName?: string;
    lastName?: string;
    email?: string;
    created?: Date;

    constructor(obj: any) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.created = obj.created;
    }
}