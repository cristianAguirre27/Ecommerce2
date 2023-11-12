const router = require('express').Router();
const controller = require('../controllers/auth.controller.js')
const authRequired = require('../middlewares/validateToken.js');


router.post("/register",controller.register);

router.post("/login",controller.login);

router.post("/logout",controller.logout);

router.get("/profile",authRequired,controller.profile)

module.exports = router;

 