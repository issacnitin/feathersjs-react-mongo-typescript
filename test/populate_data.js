var axios = require('axios');

var numCustomers = 100;
var numOrdersPerCustomer = 1000;

function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
} 

var customerCount = 0;
var promiseCount = 0;
while(customerCount < numCustomers) {
    const data = {
        firstName: randomStr((Math.random()*100)%10, 'abcdeafnomgpoeripowaaskjdnasjkdnaskpalsdpoakjiwa'),
        lastName: randomStr((Math.random()*100)%10, 'abcdeafnomgpoeripowaaskjdnasjkdnaskpalsdpoakjiwa'),
        email: randomStr((Math.random()*100)%10, 'abcdeafnomgpoeripowaaskjdnasjkdnaskpalsdpoakjiwa')+"@gmail.com"
    };
    axios.post('http://localhost:8000/_api/customers', data)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        promiseCount++;
        if(promiseCount == numCustomers) {
            b();
        }
    })
    .catch((err) => {
        console.log(err);
        promiseCount++;
        if(promiseCount == numCustomers) {
            b();
        }
    })
    customerCount++;
}


function b() {
    axios.get('http://localhost:8000/_api/customers')
    .then((customers) => {
        customers = customers.data
        console.log(customers)
        promiseCount = 0;
        for(var i = 0; i < customers.length; i++) {
            var orderCount = 0;
            while(orderCount < numOrdersPerCustomer) {
                const data = {
                    customer: customers[i]._id, //randomStr((Math.random()*100)%10, 'abcdeafnomgpoeripowaaskjdnasjkdnaskpalsdpoakjiwa'),
                    product: randomStr((Math.random()*100)%10, 'abcdeafnomgpoeripowaaskjdnasjkdnaskpalsdpoakjiwa'),
                    price: Math.random()*100,
                    quantity: Math.random()*100
                };
                axios.post('http://localhost:8000/_api/orders', data)
                .then((res) => {
                    console.log(`Status: ${res.status}`);
                    console.log('Body: ', res.data);
                    promiseCount++;
                })
                .catch((err) => {
                    console.log(err);
                    promiseCount++;
                })
                orderCount++;
            }
        }
    })
}
