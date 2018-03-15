const Crawler = require('crawler');
const { JSDOM } = require('jsdom');
const { URL } = require('url');
const { curry, compose, flatten } = require('ramda');


const getDocument = html => new JSDOM(html).window.document;
const completeUri = curry((base, uri) => new URL(uri, base).href);

const crawl = (start, process) => () => new Promise((resolve, reject) => {
  let results = [];
  const crawler = new Crawler({
    rateLimit: 1000,
    jQuery: false,
    callback: (err, res, done) => {
      const { uri } = res.request;
      console.log(uri.href)
      if (err) {
        reject(error);
      }
      process(
        getDocument(res.body),
        results.push.bind(results),
        compose(crawler.queue.bind(crawler), completeUri(uri.href))
      );
      done();
    }
  });

  crawler.on('drain', () => {
    resolve(flatten(results));
  });

  crawler.queue(start);
});

module.exports = crawl;