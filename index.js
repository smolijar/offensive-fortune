const vilejoke = require('./src/site/vilejoke');
const writeFortune = require('./src/fortune');

vilejoke()
  .then(writeFortune)
  .catch(e => console.error(e))
