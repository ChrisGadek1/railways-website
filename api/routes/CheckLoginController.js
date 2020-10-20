let express = require("express");
let router = express.Router();
let mongoClient = require("mongodb").MongoClient;
//let mongoURL = "mongodb://localhost:27017/railwaysDB";
let mongoURL = "mongodb+srv://root:gogios11s@cluster0.19cda.mongodb.net/railwaysDB?retryWrites=true&w=majority";
const session = require('express-session');



router.get("/checkLogin", function (req, res, next){
    mongoClient.connect(mongoURL, function (err, db){
        let dbo = db.db("railwaysDB");
        dbo.collection("users").findOne({"login":req.query.login}, function (err, result){
            if(result){
                res.json({
                    getOkLogin: false
                })
            }
            else{
                res.json({
                    getOkLogin: true
                });
            }
            db.close();
        });
    });
});

module.exports = router;