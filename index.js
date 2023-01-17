require('dotenv').config();
const express = require('express');
const cors = require('cors');   //for fcc review
const app = express();
let bodyParser = require("body-parser")

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// css

app.use('/public', express.static(`${process.cwd()}/public`));

// html

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// req.body wont work without bodyparser

app.use(bodyParser.urlencoded({ extended: false }))

// Your first API endpoint

let originalUrlArray = [];
let shortUrlArray = [];
let counter = 0;
const regex1 = new RegExp('https');
const regex2 = new RegExp("http");


app.post('/api/shorturl', (req, res) => {
//  console.log(req.body);
  if (regex1.test(req.body.url) || regex2.test(req.body.url)) {
  counter++;
  shortUrlArray.push(counter);
  originalUrlArray.push(req.body.url);
  res.json({ original_url: req.body.url, short_url: shortUrlArray[counter-1]});     
  } else {res.json({error: 'invalid url'})}
})

app.get("/api/shorturl/:path_short_url", (req, res) => {
//  console.log(originalUrlArray[req.params.path_short_url - 1])
  res.redirect(originalUrlArray[req.params.path_short_url - 1])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
