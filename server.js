const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/locations', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'locations.json'),
    (err, json) => {
      let obj = JSON.parse(json);
      res.json(obj);
    })
})


app.listen(process.env.PORT || 8080);
