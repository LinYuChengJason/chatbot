//require為使用模組
var express = require('express'); 
var linebot = require('linebot'); 
var apiai = require('apiai');
var mongodb = require('mongodb'); //使用模組mongodb

//建立express實體，將express初始化，去NEW一個express，變數app才是重點。
var app = express(); 

var mongodbURL =
'mongodb://LinYuCheng:a0936662285@ds143081.mlab.com:43081/jasondatabase'; //將MongoDB的位置在Server程式碼中以一個變數儲存

var myDB; //建立一個全域變數myDB
mongodb.MongoClient.connect(mongodbURL, function(err, db){ //使用mongodb.MongoClient的方法connect()進行連線
  if(err){                                               //事件監聽器用在非同步程式碼，不確定何時會用到
    console.log(err);                                  //若回傳的參數有error，用console.log()印出錯誤內容
  } else{
    myDB = db;                                         //在mongoDB成功連線後，留住db物件
    console.log('connection success');                 //若沒有錯誤表示連線成功，印出connection success
  }
});

app.get('/database', function(request, response){ //連接到/api/test才會做的事情，request帶有連接進來的資訊(參數)，response為回傳的內容。
  var collection = myDB.collection('data'); //使用myDB的方法collection('data')取得data這個collection
  collection.find({}).toArray(function(err, docs){ //使用collection的方法find()取得資料表內的內容，{}表示取得全部內容
    if(err){                                     //使用toArray()將資料轉成陣列，function的docs是轉成陣列後的結果
      response.status(406).end();              //轉陣列過程若有err，回傳給錯誤碼406，此為Http協定狀態碼      
    } else{                                      //.end()為將資料回傳給使用者
      response.type('application/json');       //沒有錯誤回傳狀態碼200並附帶著資料，因為MongoDB存的資料就是JSON，所以不用特別轉換
      response.status(200).send(docs);
      response.end();
    }
   });
});

var api = apiai("96499911855b40b29cc7908eca2ed768");

// 連接line，驗證
var bot = linebot({
  "channelId": "1531669581",
  "channelSecret": "a990b2c5396e8e5c207db5e034d74711",
  "channelAccessToken": "OTBP0oDhpEORLXeEi7dgGbROpakoaKRbB4b4p9O2WuXgP/+3KLkohEBC0gE20ayjidJ3Ja4QSmJNwchLiuqsTDnKOMD5CBwKCZ6Bwjbosu5l9kYryfY+5xO1K1chLWdN1LRZRT7By00apZS8mnUZCAdB04t89/1O/w1cDnyilFU="
}); 

bot.on('message', function(event) {

	var text = event.message.text;

	var request = api.textRequest(text, {
	    sessionId: '<Jason>'
	});
	 
	request.on('response', function(response) {

  	var action = response.result.action;    
  	var aiSpeech = response.result.fulfillment.speech;
  	if (action == '電影時刻表') {
  // 收到文字訊息時，直接把收到的訊息傳回去
    event.reply(aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
	    console.log(response);
	}else if (action == '國賓影城'){
    event.reply(aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓大戲院11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北微風廣場11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城中和環球購物中心11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '威秀影城'){
    event.reply(aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北日新威秀影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '林口MITSUIOUTLETPARK威秀影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '秀泰影城'){
    event.reply( ).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '欣欣秀泰影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '今日秀泰影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '東南亞秀泰影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋秀泰影城11/23'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓大戲院正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓大戲院絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓大戲院奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓大戲院雷神索爾3：諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北微風廣場正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北微風廣場絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北微風廣場奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北微風廣場雷神索爾3：諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北微風廣場氣象戰'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北微風廣場大佛普拉斯'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場相愛相親'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場常在你左右'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場尋找費里尼'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場神力女超人的秘密'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場乒乓少女大逆襲'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場推倒白宮的男人'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場關原之戰'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場女王與知己'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場我要為你呼吸'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場雷神索爾3：諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場人生剩利組'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場梵谷：星夜之謎'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場氣象戰'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場大佛普拉斯'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城台北長春廣場解憂雜貨店'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城中和環球購物中心正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城中和環球購物中心神力女超人的秘密'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城中和環球購物中心絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城中和環球購物中心奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城中和環球購物中心雷神索爾3：諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城中和環球購物中心大佛普拉斯'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場神力女超人的秘密'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場乒乓少女大逆襲'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場雷神索爾3：諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場氣象戰'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城林口晰境廣場大佛普拉斯'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場常在你左右'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場神力女超人的秘密'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場追兇'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場乒乓少女大逆襲'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場雷神索爾3：諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場氣象戰'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場大佛普拉斯'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '國賓影城新莊晶冠廣場解憂雜貨店'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城海闊天空 '){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城常在你左右'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城銀翼殺手2049 '){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城我要為你呼吸'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城爸爸的便當是世界第一'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城別闖陰陽界'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城氣象戰'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城銀魂：三葉篇'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城相愛相親'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城梵谷：星夜之謎'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城推倒白宮的男人'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城乒乓少女大逆襲'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城追兇'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城神力女超人的秘密'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城關原之戰 '){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城大佛普拉斯'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城解憂雜貨店'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城雷神索爾3諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北信義威秀影城女王與知己'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城我要為你呼吸'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城別闖陰陽界'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城氣象戰'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城奪魂鋸：遊戲重啟 '){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城乒乓少女大逆襲'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城追兇'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城神力女超人的秘密'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城大佛普拉斯'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城解憂雜貨店'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城雷神索爾3諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北京站威秀影城女王與知己'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北日新威秀影城氣象戰 '){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北日新威秀影城奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北日新威秀影城正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北日新威秀影城解憂雜貨店'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '台北日新威秀影城雷神索爾3諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城常在你左右'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城別闖陰陽界'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城氣象戰'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城銀魂：三葉篇'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城奪魂鋸：遊戲重啟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城正義聯盟'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城乒乓少女大逆襲'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城追兇'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城神力女超人的秘密'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城解憂雜貨店'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城絕處逢山'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == '板橋大遠百威秀影城雷神索爾3諸神黃昏'){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else if (action == ''){
    event.reply('您所查詢的電影時刻如下:'+'\n'+aiSpeech).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }else {
    event.reply('1.只要輸入"電影時刻表"或是影城名稱，就能夠引導你得到該影城的所有電影時刻表!'+'\n'+'ex:電影時刻表或是國賓影城中和環球購物中心。'+'\n'+'2.只要輸入"影城名稱:電影名稱"，就能夠得到該影城的指定電影時刻表!'+'\n'+'ex:中和國賓:正義聯盟'+'\n'+'3.只要輸入電影名稱，就能夠同時得到多家影城的指定電影時刻表!'+'\n'+'ex:正義聯盟目前支援的影城:威秀、秀泰、國賓。').then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(aiSpeech);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }
});

	request.on('error', function(error) {
	    console.log(error);
	});
	 
	request.end();
});

var linebotParser = bot.parser();

//路徑
app.post('/', linebotParser);   

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});