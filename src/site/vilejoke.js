const crawl = require('../crawl');

const parseItem = (node) => ['.joke-text', '.joke-answer .answer']
  .map(cl => node.querySelector(cl))
  .filter(node => node !== null)
  .map(node => node.textContent)
  .join(' -- ');

const process = (document, submitResults, pushUrl) => {
  const items = [...document.querySelectorAll('.content-list li')];
  submitResults(items.map(parseItem));
  const next = document.querySelector('.pagination a:last-child');
  if (next && next.textContent.includes('next')) {
    pushUrl(next.href);
  }
}



module.exports = crawl('http://vilejoke.com/index.php', process);