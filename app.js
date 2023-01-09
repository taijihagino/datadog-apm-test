var http = require("http");
var express = require("express");

var app = express();
var msgtext = "";

app.get("/", function (req, res) {
  return res.send("Hello Datadog!!");
});

function alertMsg(){
    console.log(msgtext);
}

app.get("/datadog", function (req, res) {
    msgtext = "遅延処理を発生させました";
    setTimeout(alertMsg, 30000);
    return res.send("Datadogのテストだよ");
});

app.use(function (req, res, next) {
    msgtext = "404エラーを発生させました";
    alertMsg();

    var err = new Error("Not Found");
    err.status = 404;
    return res.render("error", {
      status: err.status,
    });
});

var server = http.createServer(app);
server.listen(3000);