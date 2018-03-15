const Crawler = require('crawler');
const { JSDOM } = require('jsdom');


const getDocument = html => new JSDOM(html).window.document;

const crawl = (start, process) => () => new Promise((resolve, reject) => {
  let finalResult = [];
  const c = new Crawler({
    rateLimit: 1000,
    jQuery: false,
    callback: (err, res, done) => {
      const { uri } = res.request;

      if (err) {
        reject(error);
      }
      process(getDocument(res.body), (res) => (finalResult = finalResult.concat(res)), (relurl) => c.queue(`${uri.protocol}//${uri.hostname}/${relurl}`));
      done();
    }
  });

  c.on('drain', () => {
    resolve(finalResult);
  });

  c.queue(start);
});

module.exports = crawl;