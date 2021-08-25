const db = require("../model");
const Message = db.message;
const Chatroom = db.chatroom;

check = async (requestId, techId) => {
    var room;
    var chat = await Chatroom.findOne({ where: {requestId: requestId, techId: techId} });
    if(chat === null){
        chat = {
            requestId: requestId,
            techId: techId
        }
        await Chatroom.create(chat)
        .then(data => {
            room = data.id
            return data.id
        })
        return room
    }
    else{
        return chat.id
    }
};

exports.response = async (req, res) => {

    const message = {
        text: req.body.text,
        chatroomId: await check(req.body.requestId, req.params.id),
        sentBy: req.params.id
    }

    Message.create(message)
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        })
    })
};

exports.post = (req,res) => {
    const message = {
        text: req.body.text,
        chatroomId: req.params.chatroomId,
        sentBy: req.params.id
    }

    Message.create(message)
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        })
    })
};

exports.findByChatroom = (id) => {
    var messages = Message.findAll({
        attributes: ['text']
    })

    return messages
};

exports.findChatroom = (techId, requestId) => {
    var chatroom = Chatroom.findOne({ where:{ techId:techId, requestId:requestId} })
    return chatroom.id
};