// importing mongo client
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/kumparan';
let connection = new MongoClient(uri, {
  useUnifiedTopology: true
});

try {
  connection.connect();
  console.log('connected to mongodb');
} catch (error) {
  console.log(error);
  db = null;
}

module.exports = connection;
