const express = require("express");
const router = express.Router();
//let mongoURL = "mongodb://localhost:27017/railwaysDB";
let mongoURL = "mongodb+srv://root:gogios11s@cluster0.19cda.mongodb.net/railwaysDB?retryWrites=true&w=majority";
let mongoClient = require("mongodb").MongoClient;
let passwordHash = require('password-hash');

router.post("/",function (req,res,next){
    mongoClient.connect(mongoURL, function (err, db){
        let dbo = db.db("railwaysDB");
        let data;
        if(req.body.dataType == "password"){
            data = passwordHash.generate(req.body.data);
        }
        else{
            data = req.body.data;
        }
        let query = {};
        query[req.body.dataType] = data;
        dbo.collection("users").update(
            { login: req.body.login },
            { $set: query}
            );
        if(req.body.dataType == "login") req.session.login = data;
        else if(req.body.dataType == "email") req.session.email = data;
        db.close();
        res.send("ok");
    });
});

module.exports = router;