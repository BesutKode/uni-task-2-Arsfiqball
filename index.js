var express = require('express');
var app = express();

app.use('/assets', express.static('assets'));
app.use('/data', express.static('data'));

app.get('/', function (req, res) {
  res.sendFile(__dirname +'/index.html');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});
