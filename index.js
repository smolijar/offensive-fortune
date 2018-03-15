const Crawler = require('crawler');
const { JSDOM } = require('jsdom');

const getDocument = html => new JSDOM(html).window.document;

const parseItem = (node) => ['.joke-text', '.joke-answer .answer']
  .map(cl => node.querySelector(cl))
  .filter(node => node !== null)
  .map(node => node.textContent)
  .join(' -- ');

const process = (document , submitResults, pushUrl) => {
  const items = [...document.querySelectorAll('.content-list li')];
  submitResults(items.map(parseItem));
  const next = document.querySelector('.pagination a:last-child');
  if (next && next.textContent.includes('next')) {
    pushUrl(next.href);
  }
}

const results = {};
const submitResults = site => records => results[site] = (results[site] || []).concat(records);

const c = new Crawler({
  rateLimit: 1000,
  jQuery: false,
  callback: function (err, res, done) {
    const { uri } = res.request;
    console.log(uri.path);
    process(getDocument(res.body) , submitResults('vilejoke'), (relurl) => c.queue(`${uri.protocol}//${uri.hostname}/${relurl}`));
    done();
  }
});

c.on('drain', function(){
  console.log(results);
});
c.queue('http://vilejoke.com/index.php');