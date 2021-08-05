const db = require("../model");
const Request = db.request;

exports.createRequest = (req,res) => {
    if(!req.body.title |
        !req.body.description){
        res.status(400).send({
            message: "Empty fields!"
        });
        return;
    }

    const request = {
        title: req.body.title,
        description: req.body.description
    }

    Request.create(request)
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
}