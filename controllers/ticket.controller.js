const db = require("../model");
const Ticket = db.tickets;

exports.create = (req,res) => {
    const ticket = {
        topic: req.body.topic,
        userId: req.body.userId,
        techId: req.body.techId,
        status: 'open',
        requestId: req.body.requestId
    }

    Ticket.findAndCountAll({ where:{techId: req.body.techId, status: 'open'} },{raw:true})
    .then(data => {
        console.log(data);
        if(data.count == 2){
            console.log("You can't open more than two tickets");
            res.send(null);
        }
        else{
            if(data.count == 1 && data.rows[0].dataValues.userId != req.body.userId){
                console.log("You can't deal with different clients at the same time");
                res.send(null);
            }
            else{
                Ticket.create(ticket)
                .then(result => {
                    res.send(result)
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
    Ticket.findAll({ where: {techId: req.body.techId} })
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        });
    });
};