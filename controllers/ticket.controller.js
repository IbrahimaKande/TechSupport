const db = require("../model");
const Ticket = db.tickets;
const Request = db.request;

exports.create = (req,res) => {
    var user
    
    Ticket.findAndCountAll({ where:{techId: req.params.id, status: 'open'} },{raw:true})
    .then(data => {
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
                const ticket = {
                    topic: req.body.topic,
                    techId: req.params.id,
                    status: 'open',
                    requestId: req.body.requestId
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
                    });
                });
            }
        }
    });
};

exports.findAll = (req,res) => {
    Ticket.findAll({ where: {techId: req.params.id} })
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        });
    });
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
}