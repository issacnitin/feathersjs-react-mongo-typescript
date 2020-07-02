var axios = require('axios');

var numCustomers = 1000;

function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
} 

var customerCount = 0;
function a(promiseCount) {
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
        if(promiseCount <= numCustomers) {
            a(promiseCount + 1);
        }
    })
    .catch((err) => {
        console.log(err);
        promiseCount++;
        if(promiseCount <= numCustomers) {
            a(promiseCount + 1);
        }
    })
    customerCount++;
}

a(0)