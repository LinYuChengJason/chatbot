var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: 1511016044,
  channelSecret: 614a1dc79eaefd4ca0c37263634be761,
  channelAccessToken: TYdm9aLp06Z+QIsCrCTPGPGrt8XrNx2QpWJFI4z+FbTuhxV2/nucvHZo7+kkdPlY1EowYjAd1CSDu8sqRL3G0VJl1ks1MRhogtDDITHyz6E4qSL9GMfkyexOCdrZIRLR/gobgmdQEFQvm473Yu0m0QdB04t89/1O/w1cDnyilFU=
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});