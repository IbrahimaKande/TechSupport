const users = require("../controllers/user.controller");
const requests = require("../controllers/request.controller");
const messages = require("../controllers/message.controller");
let router = require("express").Router();

router.post("/register", users.create);
router.get("/login", users.find);
router.post("/:id/create-request", requests.create);
router.get("/:id/requests", requests.findByUserId);
router.post("/:id/chatroom=:chatroomId", messages.post);

module.exports = router