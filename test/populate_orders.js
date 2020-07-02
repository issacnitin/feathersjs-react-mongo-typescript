var axios = require('axios');

function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
} 
var numOrdersPerCustomer = 20;

axios.get('http://localhost:8000/_api/customers?limit=50&skip=5')
.then((customers) => {
    customers = customers.data.data
    var promiseCount = 0;
    a(customers, 0, 0);
})
.catch((err) => {
    console.log(err)
})

function a(customers, i, orderi) {
    if(i == customers.length && orderi == numOrdersPerCustomer) return;
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
            if(orderi == numOrdersPerCustomer)
                a(customers, i+1, 0)
            else
                a(customers, i, orderi+1)
        })
        .catch((err) => {
            console.log(err);
            if(orderi == numOrdersPerCustomer)
                a(customers, i+1, 0)
            else
                a(customers, i, orderi+1)
        })
        orderCount++;
    }
}