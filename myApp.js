const { readFile} = require('fs');
var express = require('express');
var app = express();


app.get('/', (request, response) => {
  app.use('/public', express.static(__dirname + '/public'))
  readFile('./views/index.html', 'utf8', (err, html) => {
    if (err) {
      response.status(500).send('sorry, not available');
    }
    else {
      response.send(html);
      console.log(`${request.method} ${request.path} - ${request.ip}`);
    }
  })
})
  
app.get('/json', (request, response) => {
  console.log(`${request.method} ${request.path} - ${request.ip}`);
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response.json(
    {
    "message": "HELLO JSON"
    });
  }
  else {
    response.json(
    {
    "message": "Hello json"
    });
  }
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString(); 
  next();
}, function(req, res) {
  res.json({
    time: req.time
  });
});


module.exports = app;
