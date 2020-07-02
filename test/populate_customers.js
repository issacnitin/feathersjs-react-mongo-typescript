var axios = require('axios');

var numCustomers = 10000;

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
    axios.post('http://localhost:3030/customers', data)
    .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        promiseCount++;
        if(promiseCount == numCustomers-100) {
            b();
        }
    })
    .catch((err) => {
        console.log(err);
        promiseCount++;
        if(promiseCount == numCustomers-100) {
            b();
        }
    })
    customerCount++;
}


function b() {
    console.log("done");
}
