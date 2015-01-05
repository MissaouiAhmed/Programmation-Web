var http = require('http'),
path = require('path'),
express = require('express');
var Client = require('node-rest-client').Client;

var app = express();
app.set('port', process.env.PORT || 4000); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
 

client = new Client();


app.get('/:collection', function(req, res) { 
   var params = req.params;
   var collection = params.collection;
   
client.get("http://localhost:3000/"+collection, function(data, response){
         //   console.log(data);
		     if (req.accepts('html')) { 
    	          res.render('data',{objects: data, collection: collection}); 
              } else {
	          res.set('Content-Type','application/json');
                  res.send(200, data); 
              }
        
		});
	   
});
 
app.use(function (req,res) { 
    res.render('404', {url:req.url}); 
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});