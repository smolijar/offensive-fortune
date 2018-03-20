const crawl = require('../crawl');

const parseItem = node => node.textContent.trim();

const process = (document, submitResults, pushUrl) => {
  const items = [...document.querySelectorAll('.su-list li')];
  submitResults(items.map(parseItem));
}

module.exports = crawl('https://top-funny-jokes.com/offensive-jokes/', process);