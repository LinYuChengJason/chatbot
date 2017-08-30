const express = require('express'); //require為使用那些模組
const bodyParser = require('body-parser');

const app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000)); //啟動伺服器，聆聽port 5000。預設為80port，所以多半被別人佔走。IP:127.0.0.1:5000，domain:http://localhost:5000

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

const request = require('request');

function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  request({
    url: 'https://www.facebook.com/I%E5%8A%A9%E7%90%86-219482808581751/',
    qs: {access_token: EAAEMiM9fx78BAC0wlylYZCvDEbI5YK92f7xnu24ZC2akZCVdlb5tZBDQdIVOryryim1SZARrguiHOX7OKV0bDsXTw9ZB4OLUFu3WaCx0XeblK2cORWrZCvLXpct4jSwGp7HbWGRa0ydM0sn5sX02RnIitrGzHFfdXZBKu7vaJcW8ZArXlwO45thEH},
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








