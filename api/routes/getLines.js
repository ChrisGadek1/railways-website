const express = require("express");
const router = express.Router();
//let mongoURL = "mongodb://localhost:27017/railwaysDB";
let mongoURL = "mongodb+srv://root:gogios11s@cluster0.19cda.mongodb.net/railwaysDB?retryWrites=true&w=majority";
let mongoClient = require("mongodb").MongoClient;


router.get("/", function(req,res,next){
    mongoClient.connect(mongoURL, function (err, db){
       let dbo = db.db("railwaysDB");
       dbo.collection("lines").aggregate([
           {
               $lookup: {
                   from: 'stations',
                   localField: 'stops.stations_id',
                   foreignField: '_id',
                   as: 'stops_join'
               }
           },
           {
               $lookup: {
                   from: 'stations',
                   localField: 'begin.stations_id',
                   foreignField: '_id',
                   as: 'begin'
               }
           },
           {
               $lookup: {
                   from: 'stations',
                   localField: 'end.stations_id',
                   foreignField: '_id',
                   as: 'end'
               }
           }
       ]).toArray().then(items =>{
           db.close();
           res.send(JSON.stringify(items));
       });

    });
});

module.exports = router;