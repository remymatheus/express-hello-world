const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
var request = require('request');

//collect
var _prox = {};

function collect(){
  request("https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.json", function (error, res, body) {
    var _d = JSON.parse(body);
    
    _d.every(function(e, i){
      _prox[e.ip+":"+e.port] = {
        update: Date.now()
      }
      return true;
    });

  });
}

collect();

setInterval(collect, 60000 * 10);

app.get("/", (req, res) => res.type('html').send("ok"));
app.get("/prox", (req, res) => res.type('json').send(_prox));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

