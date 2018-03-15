const Crawler = require('crawler');
const { JSDOM } = require('jsdom');
const { URL } = require('url');


const getDocument = html => new JSDOM(html).window.document;
const completeUri = (base, uri) => new URL(uri, base).href;


const crawl = (start, process) => () => new Promise((resolve, reject) => {
  let results = [];
  const c = new Crawler({
    rateLimit: 1000,
    jQuery: false,
    callback: (err, res, done) => {
      const { uri } = res.request;
      console.log(uri.href)
      if (err) {
        reject(error);
      }
      process(getDocument(res.body), results.push.bind(results), (url) => c.queue(completeUri(uri.href, url)));
      done();
    }
  });

  c.on('drain', () => {
    resolve(results.reduce((a,b) => a.concat(b)));
  });

  c.queue(start);
});

module.exports = crawl;