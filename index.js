var express = require('express'); //require為使用那些模組
var bodyParser = require('body-parser');
var request = require('request');

var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'Jason') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});

function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  request({
    url: 'https://graph.facebook.com/v2.10/me/messages',
    qs: {access_token: EAAEMiM9fx78BALUrO4zZCy0i2YRZAhnt1hGmE3YqBj5YL21uTusoVAobGlbB2ozZBgjffymcMUymq2tZAclqWQsj1B7tilOOEJPSJ6mLImXzT5UgOiuHzqgZB1OZAP2w6XM5DdhhH7vadAgHjD9P7MTzG2QXGURr4zOEktBOZC3UBrn9sBeWP3Y},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}








