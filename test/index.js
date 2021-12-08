const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../app');

const filePath = './database/article.json';
const retrieveFromJSON = fs.readFileSync(filePath);
let articles = JSON.parse(retrieveFromJSON);

describe('articles', () => {
  articles = articles.filter(value => value.id !== 4);
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

  it('should get all articles', done => {
    chai
      .request(app)
      .get('/articles')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('success');
        done();
      });
  });

  it('should post article', done => {
    chai
      .request(app)
      .post('/articles')
      .send({
        author: 'Ayaka',
        title: 'Inazuma Secret',
        body: 'Actually, I can\'t cook.'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property('success');
        done();
      });
  });
});
