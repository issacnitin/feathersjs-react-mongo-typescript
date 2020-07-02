import { Customer } from "./Models/Customers";
import { Order } from "./Models/Order";
import { AnalyticsData } from "./Models/Analytics";

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

export async function getCustomers(page: number): Promise<{data: Array<Customer>; maxPage: number}> {
    return await _call('GET', 'customers?page=' + (page-1));
}

export async function getOrders(cxId: string, page: number): Promise<{data: Array<Order>; maxPage: number}> {
    return await _call('GET', 'orders?customerId=' + cxId + "&page=" + (page-1));
}

export async function getAnalytics(): Promise<Array<AnalyticsData>> {
    return await _call('GET', 'analytics');
}