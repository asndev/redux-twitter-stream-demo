// Demo Backend
const express = require('express');
const http = require('http');
const Twitter = require('twitter');
const twitterConfig = require('./twitter.config');

const app = express();
const twitterClient = new Twitter(twitterConfig);

const server = http.createServer(app).listen(31337, function() {
  console.log('Listening at http://localhost:31337');
});

const io = require('socket.io').listen(server);

const hashtag = 'pint17';

twitterClient.stream('statuses/filter', {
  track: hashtag
}, function(stream) {
  console.log('Opening stream ...')
  stream.on('data', function(tweet) {
    console.log('Tweet received')
    // We emit socket events, st the client can listen to them
    io.emit('tweet', tweet);
  });

  stream.on('error', function(err) {
    console.error(err);
  });
});
