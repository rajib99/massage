const myModule = require('react-square-web-payments-sdk');

for (let key in myModule) {
  if (typeof myModule[key] === 'function') {
    console.log(key);
  }
}
