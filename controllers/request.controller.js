const db = require("../model");
const Request = db.request;

exports.create = (req,res) => {
    if(!req.body.title |
        !req.body.description){
        res.status(400).send({
            message: "Empty fields!"
        })
        return;
    }

    const request = {
        title: req.body.title,
        description: req.body.description,
        userId: req.params.id,
        available: true
    }

    Request.create(request)
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        })
    })
};

exports.findAll = (req,res) => {
    Request.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        })
    })
};

exports.findByUserId = (req,res) => {
    Request.findAll({ where: {userId: req.params.id} })
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        })
    })
};

exports.available = (req,res) => {
    Request.findAll({ where: {available: true}})
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Error"
        })
    })
};

exports.findUser = (id) => {
    var request = Request.findByPk(id)
    return request.userId
};