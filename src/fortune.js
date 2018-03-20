const fs = require('fs');
const { curry, compose, flatten } = require('ramda');

const serialize = (results) => results.join('\n%\n');


module.exports = compose(fs.writeFileSync.bind(null, './toxic'), serialize);
