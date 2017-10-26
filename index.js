var express = require('express'); //requireç‚ºä½¿ç”¨æ¨¡çµ„
var bodyParser = require('body-parser');
var linebot = require('linebot'); 
var mongodb = require('mongodb'); //ä½¿ç”¨æ¨¡çµ„mongodb
var apiai = require('apiai');
var request = require('request');

var app = express(); //å»ºç«‹expresså¯¦é«”ï¼Œå°‡expressåˆå§‹åŒ–ï¼ŒåŽ»NEWä¸€å€‹expressï¼Œè®Šæ•¸appæ‰æ˜¯é‡é»žã€‚

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true 
}));*/

var bot = linebot({
  "channelId": "1531669581",
  "channelSecret": "a990b2c5396e8e5c207db5e034d74711",
  "channelAccessToken": "OTBP0oDhpEORLXeEi7dgGbROpakoaKRbB4b4p9O2WuXgP/+3KLkohEBC0gE20ayjidJ3Ja4QSmJNwchLiuqsTDnKOMD5CBwKCZ6Bwjbosu5l9kYryfY+5xO1K1chLWdN1LRZRT7By00apZS8mnUZCAdB04t89/1O/w1cDnyilFU="
}); // é€£æŽ¥lineï¼Œé©—è­‰

bot.on('message', function(event) {
  if (event.message.type = 'text') {
    var msg = event.message.text;
  //æ”¶åˆ°æ–‡å­—è¨Šæ¯æ™‚ï¼Œç›´æŽ¥æŠŠæ”¶åˆ°çš„è¨Šæ¯å‚³å›žåŽ»
    event.reply(msg).then(function(data) {
      // å‚³é€è¨Šæ¯æˆåŠŸæ™‚ï¼Œå¯åœ¨æ­¤å¯«ç¨‹å¼ç¢¼ 
      console.log(msg);
    }).catch(function(error) {
      // å‚³é€è¨Šæ¯å¤±æ•—æ™‚ï¼Œå¯åœ¨æ­¤å¯«ç¨‹å¼ç¢¼ 
      console.log('éŒ¯èª¤ç”¢ç”Ÿï¼ŒéŒ¯èª¤ç¢¼ï¼š'+error);
    });
  }
});

/*bot.on('message', function(event) {
  console.log(event); //æŠŠæ”¶åˆ°è¨Šæ¯çš„ event å°å‡ºä¾†çœ‹çœ‹
});*/

var linebotParser = bot.parser();
app.post('/', linebotParser);  //è·¯å¾‘ 

var api = apiai("96499911855b40b29cc7908eca2ed768");

app.get('api' , function(request , response){	

var text = message.text;
var request = api.textRequest('text', {
    sessionId: 'Jason'
});

var err=response.status(200);

if(err){
	request.on('response', function(response) {
	bot.reply(response);
	console.log(response);
	// response.status(200);
	}); 
}
else{
	request.on('error', function(error) {
	console.log(error);
	// response.status(406).end();
	}
}

// request.on('response', function(response) {
// 	bot.reply(response);
// 	console.log(response);
// 	response.status(200);
// }); 



// request.on('error', function(error) {
// 	console.log(error);
// 	response.status(406).end();
// }



request.end();


/*if(err){                                    
			response.status(406).end();             
		} else{                                      
			response.type('application/json');      
			response.status(200).send(docs);
			response.end();
		}*/
})

/*app.post('/webhook', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'weather'
    });
});*/
var mongodbURL =
'mongodb://LinYuCheng:a0936662285@ds143081.mlab.com:43081/jasondatabase'; //å°‡MongoDBçš„ä½ç½®åœ¨Serverç¨‹å¼ç¢¼ä¸­ä»¥ä¸€å€‹è®Šæ•¸å„²å­˜

var myDB; //å»ºç«‹ä¸€å€‹å…¨åŸŸè®Šæ•¸myDB
mongodb.MongoClient.connect(mongodbURL, function(err, db){ //ä½¿ç”¨mongodb.MongoClientçš„æ–¹æ³•connect()é€²è¡Œé€£ç·š
	if(err){                                               //äº‹ä»¶ç›£è½å™¨ç”¨åœ¨éžåŒæ­¥ç¨‹å¼ç¢¼ï¼Œä¸ç¢ºå®šä½•æ™‚æœƒç”¨åˆ°
		console.log(err);                                  //è‹¥å›žå‚³çš„åƒæ•¸æœ‰errorï¼Œç”¨console.log()å°å‡ºéŒ¯èª¤å…§å®¹
	} else{
		myDB = db;                                         //åœ¨mongoDBæˆåŠŸé€£ç·šå¾Œï¼Œç•™ä½dbç‰©ä»¶
		console.log('connection success');                 //è‹¥æ²’æœ‰éŒ¯èª¤è¡¨ç¤ºé€£ç·šæˆåŠŸï¼Œå°å‡ºconnection success
	}
});

app.get('/database', function(request, response){ //é€£æŽ¥åˆ°/databaseæ‰æœƒåšçš„äº‹æƒ…ï¼Œrequestå¸¶æœ‰é€£æŽ¥é€²ä¾†çš„è³‡è¨Š(åƒæ•¸)ï¼Œresponseç‚ºå›žå‚³çš„å…§å®¹ã€‚
	var collection = myDB.collection('data'); //ä½¿ç”¨myDBçš„æ–¹æ³•collection('data')å–å¾—dataé€™å€‹collection
	collection.find({}).toArray(function(err, docs){ //ä½¿ç”¨collectionçš„æ–¹æ³•find()å–å¾—è³‡æ–™è¡¨å…§çš„å…§å®¹ï¼Œ{}è¡¨ç¤ºå–å¾—å…¨éƒ¨å…§å®¹
		if(err){                                     //ä½¿ç”¨toArray()å°‡è³‡æ–™è½‰æˆé™£åˆ—ï¼Œfunctionçš„docsæ˜¯è½‰æˆé™£åˆ—å¾Œçš„çµæžœ
			response.status(406).end();              //è½‰é™£åˆ—éŽç¨‹è‹¥æœ‰errï¼Œå›žå‚³çµ¦éŒ¯èª¤ç¢¼406ï¼Œæ­¤ç‚ºHttpå”å®šç‹€æ…‹ç¢¼      
		} else{                                      //.end()ç‚ºå°‡è³‡æ–™å›žå‚³çµ¦ä½¿ç”¨è€…
			response.type('application/json');       //æ²’æœ‰éŒ¯èª¤å›žå‚³ç‹€æ…‹ç¢¼200ä¸¦é™„å¸¶è‘—è³‡æ–™ï¼Œå› ç‚ºMongoDBå­˜çš„è³‡æ–™å°±æ˜¯JSONï¼Œæ‰€ä»¥ä¸ç”¨ç‰¹åˆ¥è½‰æ›
			response.status(200).send(docs);
			response.end();
		}
   });
});

//å› ç‚º express é è¨­èµ° port 3000ï¼Œè€Œ heroku ä¸Šé è¨­å»ä¸æ˜¯ï¼Œè¦é€éŽä¸‹åˆ—ç¨‹å¼è½‰æ›
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});







