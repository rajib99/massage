const myModule = require('square');

for (let key in myModule) {
  console.log(key, typeof myModule[key]);
  if (typeof myModule[key] === 'function') {
   
  }
}


const fns = () => {
}

export default fns;