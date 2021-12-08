const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const articleRoutes = require('./routes/article');
app.use('/articles', articleRoutes);

module.exports = app.listen(port, () => console.log(`listening on port ${port}`));
