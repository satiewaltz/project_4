var express = require('express')
var app = express()
var path = require('path');
var port = process.env.PORT || 8080;

app.set('views',__dirname + '/html')
app.use(express.static(__dirname+'/public'))

//2. start our server on port 3000 with app.listen
app.listen(port,function(){
  console.log('Server live on localhost:' + port);
})

//5. create a get route at '/' to serve out index.html
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
})
