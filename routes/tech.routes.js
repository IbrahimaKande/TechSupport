const techs = require("../controllers/tech.controller");
let router = require("express").Router();

router.post("/register", techs.create);
router.get("/login", techs.find);

module.exports = router
