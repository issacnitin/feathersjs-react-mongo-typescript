var axios = require('axios');

function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
} 
var numOrdersPerCustomer = 1;

axios.get('http://localhost:3030/customers?limit=429837489237489')
.then((customers) => {
    customers = customers.data.data
    var promiseCount = 0;
    for(var i = 0; i < customers.length; i++) {
        var orderCount = 0;
        while(orderCount < numOrdersPerCustomer) {
            const data = {
                customer: customers[i]._id, //randomStr((Math.random()*100)%10, 'abcdeafnomgpoeripowaaskjdnasjkdnaskpalsdpoakjiwa'),
                product: randomStr((Math.random()*100)%10, 'abcdeafnomgpoeripowaaskjdnasjkdnaskpalsdpoakjiwa'),
                price: Math.random()*100,
                quantity: Math.random()*100
            };
            axios.post('http://localhost:3030/orders', data)
            .then((res) => {
                // console.log(`Status: ${res.status}`);
                // console.log('Body: ', res.data);
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
.catch((err) => {
    console.log(err)
})