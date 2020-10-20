const express = require("express");
const router = express.Router();
//let mongoURL = "mongodb://localhost:27017/railwaysDB";
let mongoURL = "mongodb+srv://root:gogios11s@cluster0.19cda.mongodb.net/railwaysDB?retryWrites=true&w=majority";
let mongoClient = require("mongodb").MongoClient;

router.get("/",function (req,res,next){
    mongoClient.connect(mongoURL, function (err,db){
       let dbo = db.db("railwaysDB");
       dbo.collection("stations").find({}).toArray().then(items => {
          res.json(items);
       });
    });
});

module.exports = router;