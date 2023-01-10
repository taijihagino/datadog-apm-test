var http = require("http");
var express = require("express");

var app = express();
var msgtext = "";

app.get("/", function (req, res) {
  return res.send("Hello Datadog!!");
});

app.get("/datadog", function (req, res) {
  (async () => {
    console.time('Waited for');
    await new Promise(resolve => setTimeout(resolve, 15000));
    console.timeLog('Waited for');
    return res.send("15秒遅延させてから画面を表示しました");
  })();
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