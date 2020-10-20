let express = require("express");
let router = express.Router();
//let mongoURL = "mongodb://localhost:27017/railwaysDB";
let mongoURL = "mongodb+srv://root:gogios11s@cluster0.19cda.mongodb.net/railwaysDB?retryWrites=true&w=majority";
let mongoClient = require("mongodb").MongoClient;
let passwordHash = require('password-hash');

router.post("/",function (req, res, next){
    /*mongoClient.connect(mongoURL, function (err, db){
        let dbo = db.db("railwaysDB");
       let linesIds = ["5f6e5fab689675b4eaad1e26","5f6e602a689675b4eaad1e27","5f6e60b7689675b4eaad1e28","5f6e61d4689675b4eaad1e29","5f6e622f689675b4eaad1e2a","5f6e6277689675b4eaad1e2b","5f7b1d695d5ffff2372be155"];
       for(let line = 0; line < linesIds.length; line++){
           for(let classTrain = 3; classTrain >= 1; classTrain--){
               for(let time = parseInt(180*(3/classTrain + 5/classTrain)*(1+line/linesIds.length)+13)*10; time < 60*60*24*7; time+=123*(3/classTrain+21)*10){
                   let train = {
                       class: classTrain,
                       line_id : linesIds[line],
                       time: time,
                       seats: Math.floor(Math.random() * 100)+200,
                       direction: "reverse"
                   }
                   dbo.collection("trains").insertOne(train,function (err, res){

                   });
               }
           }
       }
        for(let line = 0; line < linesIds.length; line++){
            for(let classTrain = 3; classTrain >= 1; classTrain--){
                for(let time = parseInt(180*(3/classTrain + 5/classTrain)*(1+line/linesIds.length)+13)*10+31*60; time < 60*60*24*7; time+=123*(3/classTrain+21)*10){
                    let train = {
                        class: classTrain,
                        line_id : linesIds[line],
                        time: time,
                        seats: Math.floor(Math.random() * 100)+200,
                        direction: "forward"
                    }
                    dbo.collection("trains").insertOne(train,function (err, res){

                    });
                }
            }
        }
       db.close();
    });*/
   mongoClient.connect(mongoURL, function (err, db){
      let dbo = db.db("railwaysDB");
      let receivedData = {login: req.body.login};
      dbo.collection("users").find(receivedData).toArray().then(items => {
          if(items.length == 1 && passwordHash.verify(req.body.password, items[0].password)){
              req.session.logged = true;
              req.session.login = items[0].login;
              req.session.email = items[0].email;
              req.session.save();
              db.close();
              res.json({
                 success: true
              });
          }
          else{
              res.json({
                  success: false
              })
          }
      });
   });
});



module.exports = router;