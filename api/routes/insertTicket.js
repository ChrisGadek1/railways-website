const express = require("express");
const router = express.Router();
let mongoClient = require("mongodb").MongoClient;
let mongoURL = "mongodb+srv://root:gogios11s@cluster0.19cda.mongodb.net/railwaysDB?retryWrites=true&w=majority";
//let mongoURL = "mongodb://localhost:27017/railwaysDB";

router.post("/",function(req, res, next){
    mongoClient.connect(mongoURL, function (err, db){
       let dbo = db.db("railwaysDB");
       dbo.collection("users").find({login:req.body.login}).toArray().then(items => {
           let ticket = {
               user_id: items[0]._id,
               stations: req.body.stations,
               date: req.body.date,
               changingTime: req.body.changingTime,
           };
           dbo.collection("tickets").insertOne(ticket);
           db.close();
           res.send("ok");
       });
    });
});

module.exports = router;