// server.js
// where your node app starts

// init project
const express = require('express');
const {parseDate} = require('chrono-node');
const {format, parse } = require('date-fns');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
const isUnixTimestamp = timestamp => {
  const unixTime = new Date(timestamp * 1000);
  if (unixTime != 'Invalid Date') {
    return unixTime
  } else{
    return false
  }
}
const isNLDate = timestamp => parseDate(timestamp);
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/time', (req, res) => {
  const response = {
    unix: null,
    natural: null
  }
  const { timestamp } = req.query

  const parsedTimestamp = isUnixTimestamp(timestamp)
  const parsedNLDate = isNLDate(timestamp)

  if (parsedTimestamp) {
    response.unix = parseInt(timestamp, 10),
    response.natural = format(parsedTimestamp, 'MMMM d, yyyy')
  }

  if (parsedNLDate) {
    response.unix = parsedNLDate.getTime()/1000
    response.natural = timestamp
  }

  res.send(response)
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
