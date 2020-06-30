export class Customer {
    firstName: string;
    lastName: string;
    email: string;
    created: Date;

    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.created = new Date();
    }
}