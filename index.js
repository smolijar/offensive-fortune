const vilejoke = require('./src/site/vilejoke');
const topFunnyJokes = require('./src/site/top-funny-jokes');
const writeFortune = require('./src/fortune');
const { flatten } = require('ramda');

Promise.all([
  topFunnyJokes(),
  vilejoke(),
])
  .then(flatten)
  .then(writeFortune)
  .catch(e => console.error(e))
