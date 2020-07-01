import { Customer } from "./Models/Customers";

async function _call(method: string, url: string, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open(method, 'http://localhost:8000/_api/' + url);
        req.onload = function(this) {
            resolve(JSON.parse(this.response))
        }
        req.send();
    })
}

export async function getCustomers(): Promise<Array<Customer>> {
    return await _call('GET', 'customers');
}