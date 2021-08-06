const users = require("../controllers/user.controller");
const requests = require("../controllers/request.controller");
let router = require("express").Router();

router.post("/register", users.create);
router.get("/login", users.find);
router.post("/create-request", requests.create);
router.post("/requests", requests.findByUserId);

module.exports = router