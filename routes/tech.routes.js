const techs = require("../controllers/tech.controller");
const requests = require("../controllers/request.controller");
const tickets = require("../controllers/ticket.controller");
let router = require("express").Router();

router.post("/register", techs.create);
router.get("/login", techs.find);
router.get("/requests", requests.findAll);
router.post("/create-ticket", tickets.create);
router.get("/tickets", tickets.findAll);

module.exports = router
