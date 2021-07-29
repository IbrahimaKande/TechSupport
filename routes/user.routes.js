const users = require("../controllers/user.controller");
let router = require("express").Router();

router.post("/register", users.create);
router.get("/login", users.find);

module.exports = router