var express = require('express'); //require為使用那些模組
var bodyParser = require('body-parser');
var request = require('request');

var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000)); //啟動伺服器，聆聽port 5000。預設為80port，所以多半被別人佔走。IP:127.0.0.1:5000，domain:http://localhost:5000

/* For Facebook Validation */
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === '<validation_token>') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

/* Handling all messenges */
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging; //所有訊息

  for (i = 0; i < messaging_events.length; i++) { // 遍歷毎一則

    event = req.body.entry[0].messaging[i]; 
    sender = event.sender.id; // 誰發的訊息

    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
    }
  }
  res.sendStatus(200);
});

var token = "<EAAEMiM9fx78BALmSHF7syWxZAry34fNNnBSKKbyXoWuzpS6ZAbhHG7ZAxhn4WZAdTqH5QXkpDyFnKF21nuXtZB44ulmGpcB9aIbkaA4vPQpamdgM7CUfPRERHDZAcg8CdfZCkCYTQ2ZBVhDZBKU7rvqf6BJcx9ZCQalFXpxxc7c0Wott1EmGYOb53n>";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}








