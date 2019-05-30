"use strict";

const http         = require('http');
const finalhandler = require('finalhandler');
const Router       = require('router');
const bodyParser = require('body-parser');

const router = new Router();
router.use(bodyParser.json({type: 'application/*+json' }));

let nextId = 1;

class Message {
  constructor(message) {
    this.id = nextId;
    this.message = message;
    nextId++;
  }
}
let messages = [];

router.get('/', (request, response) => {
  // A good place to start!
  response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  response.end('Hello, World!');
});

router.post('/message', (request, response) => {
  // Save the message and send the message id back to the client.
  response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if(!request.body.message){
    response.statusCode = 400;
    response.statusMessage = 'No message provided.';
    response.end();
    return;
    }
  let newMsg = request.body.message
  messages.push(newMsg)
  
  response.end(JSON.stringify(newMsg.id))
});

const server = http.createServer((request, response) => {
  router(request, response, finalhandler(request, response));
});

exports.listen = function(port, callback) {
  server.listen(port, callback);
};

exports.close = function(callback) {
  server.close(callback);
};
