const express = require("express");
const router = express.Router();
//let mongoURL = "mongodb://localhost:27017/railwaysDB";
let mongoURL = "mongodb+srv://root:gogios11s@cluster0.19cda.mongodb.net/railwaysDB?retryWrites=true&w=majority";
let mongoClient = require("mongodb").MongoClient;
let passwordHash = require('password-hash');

router.get("/", function (req,res,next){
    mongoClient.connect(mongoURL, function (err, db){
       let dbo = db.db("railwaysDB");
       dbo.collection("users").find({login:req.query.login}).toArray().then(items =>{
           let user = items[0];
           dbo.collection("tickets").find({ user_id: user._id }).toArray().then(items => {
               db.close()
               res.json(items);
           });
       });
    });
});

module.exports = router;