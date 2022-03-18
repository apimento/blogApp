const router = require('express').Router(); 
//after npm i express-validator 
const{body} = require("express-validator");

const authCntrl = require("../controllers/auth"); 

router.get("/auth/signup", authCntrl.auth_signup_get);
router.post("/auth/signup",[
    body('firstName').isLength({min: 3}).withMessage("First name must be at least 3 characters long").notEmpty().withMessage("firtName cannot be null"),
    body('lastName').isLength({min:2}), 
    body('emailAddress').isEmail(), 
    body('password').isLength({min:8})
], authCntrl.auth_signup_post);


router.get("/auth/signin", authCntrl.auth_signin_get);  
router.post("/auth/signin", authCntrl.auth_signin_post); 

router.get("/auth/logout", authCntrl.auth_logout_get);

module.exports = router;