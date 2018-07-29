var express = require("express");
var bodyParser = require("body-parser");
var mongo = require("mongodb");

var app = express();

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/testDb";
var dbo;

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  function(err, db) {
    if (err) throw err;
    this.dbo = db.db("TestDb");
    console.log("Connection created!!");
  }
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addtask", function(req, res, next) {
  console.log(req.body);
  let newTask = req.body.newTask;

  var myobj = { taskList: newTask };

  this.dbo.collection("tasks").insertOne(myobj, function(err, response) {
    if (err) throw err;
    console.log("1 document inserted");
    res.send(response);
  });

});

app.get("/", function(req, res, next) {
  
  this.dbo
    .collection("tasks")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      // db.close();
      res.send({ task: result });
    });
});

app.post("/deleteTask", function(req, res, next) {
  console.log(req.body);
  let delTask = req.body.taskList.taskList;
  var myquery = { taskList:  delTask};
  console.log("query", myquery);
  this.dbo.collection("tasks").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.send({msg : "deleted"});
  });
});

app.put("/updateTask", function(req, res, next) {
  console.log("update",req.body);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
