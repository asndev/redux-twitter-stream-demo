var path = require('path');
var express = require('express');
var webpack = require('webpack');
var http = require('http');
var Twitter = require('twitter');
var config = require('./webpack.config');
var twitterConfig = require('./twitter.config');

var app = express();
var compiler = webpack(config);

var twitterClient = new Twitter(twitterConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var server = http.createServer(app).listen(3000, function() {
  console.log('Listening at http://localhost:3000');
});

var io = require('socket.io').listen(server);

twitterClient.stream('statuses/filter', {
  track: 'javascript'
}, function(stream) {
  stream.on('data', function(tweet) {
    io.emit('tweet', tweet);
  });

  stream.on('error', function(err) {
    console.error(err);
  });
});
