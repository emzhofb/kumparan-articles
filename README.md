# kumparan-test

How To

prepare your machine
1. install nodejs
2. install nodemon (optional)
3. install mongodb
4. install redis

to run the app

1. clone this repo
2. cd kumparan-test
3. npm install
4. node app.js or npm start if you already have nodemon
  - api
  ```
  localhost:5000/articles => get => to get all articles
  localhost:5000/articles => post => to add article
  ```
  - get article
  ```
  get all article => localhost:5000/articles
  get article with query => localhost:5000/articles?query=computer science
  get article with author => localhost:5000/articles?author=ayaka

  response
  {
    "success": true,
    "data": [
        {
            "id": 4,
            "title": "Inazuma Secret",
            "author": "Ayaka",
            "body": "Actually, I can't cook.",
            "created": "2021-08-21T11:57:46.924Z"
        },
        {
            "id": 3,
            "author": "Wildani",
            "title": "What is Data Structure",
            "body": "In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification.",
            "created": "2021-01-03T12:00:00.000Z"
        },
        {
            "id": 2,
            "author": "Muhammad",
            "title": "What is Time Complexity",
            "body": "In computer science, the time complexity is the computational complexity that describes the amount of computer time it takes to run an algorithm.",
            "created": "2021-01-02T12:00:00.000Z"
        },
        {
            "id": 1,
            "author": "Ikhda",
            "title": "What is Big (O) Notation",
            "body": "Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.",
            "created": "2021-01-01T12:00:00.000Z"
        }
    ]
  }
  ```
  - post article
  ```
  post localhost:5000/articles
  body
  {
    "author": "Ayaka",
    "title": "Inazuma Secret",
    "body": "Actually, I can't cook."
  }
  response
  {
    "success": true,
    "data": {
        "id": 4,
        "title": "Inazuma Secret",
        "author": "Ayaka",
        "body": "Actually, I can't cook.",
        "created": "2021-08-21T13:49:17.010Z"
    }
  }
  ```
5. npm test (to test the api)
6. docker build . -t kumparan/articles (to build with docker)
