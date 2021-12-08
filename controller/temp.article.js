// if you want to learn and adapt this logic only without any db or cache or search module, you can refer this.

const fs = require('fs');
const filePath = './database/article.json';
const cachePath = './database/cache.json';
const retrieveFromJSON = fs.readFileSync(filePath);
const cacheFromJSON = fs.readFileSync(cachePath);
const articles = JSON.parse(retrieveFromJSON);
const cache = JSON.parse(cacheFromJSON);

exports.getArticles = (req, res, next) => {
  const { query, author } = req.query;
  // get cache
  let hasCache;
  if (cache.length > 0) {
    let keyword = query + author ? query + author : '/';
    hasCache = cache.filter(value => value.keyword === keyword);
  }
  if (hasCache.length > 0) {
    return res.status(200).json({ success: true, data: hasCache[0].data });
  } else {
    let filterArticles = [];
    if (query || author) {
      if (author) {
        let result = articles.filter(value => {
          const rgx = new RegExp(author, 'gi');
          return value.author.match(rgx);
        });
        filterArticles.push(...result);
      }
      if (query) {
        const splitQuery = query.split(' ');
        for (let q of splitQuery) {
          let result = articles.filter(value => {
            const rgx = new RegExp(q, 'gi');
            return value.title.match(rgx) || value.body.match(q);
          });
          filterArticles.push(...result);
        }
      }
      filterArticles = [...new Set(filterArticles)];
    } else {
      filterArticles = [...articles];
    }
    filterArticles = filterArticles.sort((a, b) => new Date(b.created) - new Date(a.created));
  
    // set cache
    const dataCache = { 
      keyword: query + author ? query + author : '/',
      data: filterArticles
    };
    cache.push(dataCache);
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
    
    return res.status(200).json({ success: true, data: filterArticles });
  }
};

exports.postArticle = (req, res, next) => {
  const { author, title, body } = req.body;
  // check duplicate
  let duplicate;
  articles.map(value => {
    if (value.title === title) {
      duplicate = 'title';
    } else if (value.body === body) {
      duplicate = 'body';
    }
  });
  
  if (duplicate) {
    return res.status(400).json({ success: false, error: `${duplicate} duplicate.` });
  } else {
    const data = { 
      id: articles[articles.length - 1].id + 1, 
      title, 
      author, 
      body, 
      created: new Date() 
    };
  
    articles.push(data);
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
    // reset cache
    fs.writeFileSync(cachePath, JSON.stringify([], null, 2));
    return res.status(201).json({ success: true, data });
  }
}
