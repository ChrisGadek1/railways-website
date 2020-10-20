const express = require("express");
const router = express.Router();

router.post("/", function (req,res,next){
    if(req.body.authenticated){
        req.session.destroy();
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

module.exports = router;