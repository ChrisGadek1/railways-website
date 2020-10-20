let express = require("express");
let router = express.Router();
let mongoClient = require("mongodb").MongoClient;
//let mongoURL = "mongodb://localhost:27017/railwaysDB";
let mongoURL = "mongodb+srv://root:gogios11s@cluster0.19cda.mongodb.net/railwaysDB?retryWrites=true&w=majority";
let passwordHash = require('password-hash');

router.post("/", function(req, res, next){
    let hashedPassword = passwordHash.generate(req.body.password);
    mongoClient.connect(mongoURL, function (err, db){
        if (err) throw err;
       let dbo = db.db("railwaysDB");
       let record = {login: req.body.login, password: hashedPassword, email: req.body.email};
       dbo.collection("users").insertOne(record, function(err, res){
           if (err) throw err;
           db.close();
       });
    });
    res.json({
        success: true
    })
});

module.exports = router;