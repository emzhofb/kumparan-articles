const connection = require('../database');
const db = connection.db('kumparan');
let articles = db.collection('articles');
articles.createIndex({ "$**": "text" });

const redis = require("redis");
const redisPort = 6379
const client = redis.createClient(redisPort);
client.on("error", (err) => {
  console.log(err);
});

exports.getArticles = async (req, res, next) => {
  const { query, author } = req.query;
  const filter = {};
  if (query || author) {
    if (query) {
      filter.$text = {
        $search: query
      };
    }
    if (author) {
      filter.author = {
        $regex: new RegExp(author, 'gi')
      };
    }
  }
  try {
    const cache = await client.get(filter);
    if (cache) {
      return res.status(200).json({ 
        success: true,
        data: JSON.parse(cache),
        message: "data retrieved from the cache",
      });
    } else {
      const article = await articles.find(filter).sort({ createdAt: -1 }).toArray();
      client.setEx(searchTerm, 600, JSON.stringify(article));

      return res.status(200).json({ 
        success: true,
        data: article,
        message: "cache miss"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
}

exports.postArticle = async (req, res, next) => {
  const { author, title, body } = req.body;
  try {
    const data = {
      author,
      title,
      body,
      createdAt: new Date(),
    };
    const article = await articles.insertOne(data);
    return res.status(201).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
}
