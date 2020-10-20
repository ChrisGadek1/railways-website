const express = require("express");
const router = express.Router();


router.get("/", function (req, res, next){
    if(req.session.logged){
        res.json({
            logged: true,
            login: req.session.login,
            password: "[ zaszyfrowane ]",
            email: req.session.email
        });
    }
    else{
        res.json({
            logged: false,
            login: "",
            password: "[ zaszyfrowane ]",
            email: ""
        });
    }
});

module.exports = router;