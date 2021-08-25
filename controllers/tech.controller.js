const db = require("../model");
const bcrypt = require('bcrypt');
const Tech = db.techs;

exports.create = (req,res) => {
    if(!req.body.firstName|
        !req.body.lastName|
        !req.body.email|
        !req.body.password){
        res.status(400).send({
            message: "Empty fields!"
        });
        return;
    }

    var hash = bcrypt.hashSync(req.body.password,10);

    const tech = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        nTickets: 0,
    };

    Tech.findOne({ where: {email: req.body.email} }).then(function(result){
        if(result === null){
            Tech.create(tech)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error"
                });
            });
        }
        else{
            console.log("email already used");
            res.send(null);
        }
    });
};

exports.find = (req,res) =>{
    const tech = Tech.findOne({ where: {email: req.body.email}})
    .then(tech => {
        if(tech === null){
            console.log("email not found");
            res.send(null);
        }
        else{
            if(bcrypt.compareSync(req.body.password,tech.password)){
                console.log("connected");
                console.log(tech.get({ plain: true }));
                res.send(tech);
            }
            else{
                console.log("wrong password");
                res.send(null);
            }
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error connectiong user"
        })
    })
    .finally(() =>{
        return true
    })
};

exports.findById = (id) => {
    var tech = Tech.findByPk(id)
    var name = tech.firstName + " " + tech.lastName
    return name
}