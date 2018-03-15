const vilejoke = require('./src/site/vilejoke');
const fs = require('fs');

const serialize = (results) => results.join('\n%\n');

vilejoke()
  .then(res => fs.writeFileSync(`./res`, serialize(res)))
  .catch(e => console.error(e))
