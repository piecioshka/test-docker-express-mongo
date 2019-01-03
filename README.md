# test-docker-express-mongo

[![dependencies](https://david-dm.org/piecioshka/test-docker-express-mongo.svg)](https://github.com/piecioshka/test-docker-express-mongo)

:ledger: Testing Docker with two apps: `HTTP server with Express.js` and `MongoDB`

## Features

* :white_check_mark: Connect application server (in Express.js) with database server (MongoDB)

## Step by step 👣

* Create directory `dockerfiles/`
* Create `Dockerfile` for Node.js app
* Create `Dockerfile` for MongoDB
* Create HTTP server in `src/index.js`
* Move routing to `src/router.js`
* Create `src/mongo-helper.js` (without error handling)
* Connect to MongoDB with `npm/mongo` package
* Create routes:
    + `/` - should returns all routes
    + `/test` - should returns status of connection to MongoDB
    + `/setup` - should insert fake data into MongoDB
    + `/cars/:name` - should returns cars passed in get (case insensitive)
* Add error handling in route handlers

## Usage

1. Build images:

    ```bash
    docker build -t piecioshka/demo:3 -f dockerfiles/mongo.Dockerfile .
    docker build -t piecioshka/demo:4 -f dockerfiles/node.Dockerfile .
    ```

2. Start containers:

    ```bash
    docker run -it --rm -p 27017:27017 --name db piecioshka/demo:3
    docker run -it --rm -p 3000:3000 --name web piecioshka/demo:4
    ```

    or with docker-compose:

    ```bash
    docker-compose up
    ```

3. Testing that app is working (should connect to database)

    ```bash
    http localhost:3000/
    http localhost:3000/test
    http localhost:3000/cars/ferrari
    http localhost:3000/setup
    http localhost:3000/cars/ferrari
    ```

## Related

* [test-docker](https://github.com/piecioshka/test-docker) - hello world app in Node.js with Docker
* [test-docker-http](https://github.com/piecioshka/test-docker-http) - HTTP server in Node.js with Docker

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2019
