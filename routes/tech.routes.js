const techs = require("../controllers/tech.controller");
const requests = require("../controllers/request.controller");
const tickets = require("../controllers/ticket.controller");
const messages = require("../controllers/message.controller");
let router = require("express").Router();

router.post("/register", techs.create);
router.get("/login", techs.find);
router.get("/:id/requests", requests.available);
router.get("/:id/all-requests", requests.findAll);
router.post("/:id/create-ticket", tickets.create);
router.get("/:id/tickets", tickets.findAll);
router.post("/:id/close-ticket/:ticketId", tickets.close);
router.post("/:id/response", messages.response);
router.post("/:id/chatroom=:chatroomId", messages.post);

module.exports = router
