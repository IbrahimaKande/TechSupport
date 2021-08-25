const db = require("../model");
const Ticket = db.tickets;
const Request = db.request;
const Chatroom = db.chatroom;
const Message = db.message;
const Tech = db.techs;
const User = db.users;

loadUser = async (requestId) => {
    var request = await Request.findOne({ where:{id: requestId} })
    console.log(request)
    var user = await User.findByPk(request.userId)
    console.log(user)
    const res = {
        name: user.firstName + " " + user.lastName,
        email: user.email
    }

    var data = JSON.stringify(res)
    console.log(data)
    return data
}

loadTech = async (id) => {
    var tech = await Tech.findByPk(id)
    const res = {
        name: tech.firstName + " " + tech.lastName,
        email: tech.email
    }
    var data = JSON.stringify(res)
    console.log(data)
    console.log(typeof data)
    return data
}

check = async (requestId, techId) => {
    var chat = await Chatroom.findOne({ where: {requestId: requestId, techId: techId} });
    console.log(chat)
    return chat.id
}

loadMessages = async (chatroomId) => {
    var messages = await Message.findAll({ raw: true, where: {chatroomId: chatroomId}, attributes:['text'] })
    var stringMessages = JSON.stringify(messages)
    console.log(stringMessages)
    console.log(typeof stringMessages)
    return stringMessages
}

exports.create = async (req,res) => {
    var user
    
    await Ticket.findAndCountAll({ where:{techId: req.params.id, status: 'open'} },{raw:true})
    .then(async (data) => {
        console.log(data);
        if(data.count == 2){
            console.log("You can't open more than two tickets");
            res.send(null);
        }
        else{
            Request.findByPk(req.body.requestId)
            .then(result => {
                user = result.id
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || "Error"
                })
            })

            if(data.count == 1 && data.rows[0].dataValues.userId != user){
                console.log("You can't deal with different clients at the same time");
                res.send(null);
            }
            else{
                var room = await check(req.body.requestId, req.params.id)
                const ticket = {
                    topic: req.body.topic,
                    techId: req.params.id,
                    tech: await loadTech(req.params.id),
                    user: await loadUser(req.body.requestId),
                    status: 'open',
                    requestId: req.body.requestId,
                    chatroom: room,
                    messages: await loadMessages(room)
                }

                Ticket.create(ticket)
                .then(result => {
                    res.send(result)
                    Request.update({ available: false },
                        { where: {
                            id: req.body.requestId 
                        } 
                    })
                })
                .catch(error => {
                    res.status(500).send({
                        message: error.message || "Error"
                    })
                })
            }
        }
    })
};

exports.findAll = (req,res) => {
    Ticket.findAll({ where: {techId: req.params.id} })
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        })
    })
};

exports.close = (req,res) => {
    Ticket.update({ status: "close" }, 
    { where: { 
        id: req.params.ticketId 
        } 
    })
    .then(data => {
        res.send(data)
    })
};