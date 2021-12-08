const express = require('express');
const routes = express();

const { getArticles, postArticle } = require('../controller/article');

routes.get('/', getArticles);
routes.post('/', postArticle);

module.exports = routes;
