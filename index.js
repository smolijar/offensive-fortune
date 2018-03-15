const Crawler = require('crawler');
const { JSDOM } = require('jsdom');

const getDocument = html => new JSDOM(html).window.document;

const parseItem = (node) => ['.joke-text', '.joke-answer .answer']
  .map(cl => node.querySelector(cl))
  .filter(node => node !== null)
  .map(node => node.textContent)
  .join(' -- ');

const process = (document , submitResults/*, pushUrl */) => {
  const items = [...document.querySelectorAll('.content-list li')];
  submitResults(items.map(parseItem));
}

const results = {};
const submitResults = site => records => results[site] = (results[site] || []).concat(records);

const c = new Crawler({
  rateLimit: 1000,
  jQuery: false,
  callback: function (err, res, done) {
    process(getDocument(res.body) , submitResults('vilejoke')/*, c.queue */);
    done();
  }
});

c.on('drain', function(){
  console.log('on drain');
  console.log(results);
});
c.queue('http://vilejoke.com/index.php?page=4');