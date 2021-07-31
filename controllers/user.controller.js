const db = require("../model");
const { use } = require("../routes/user.routes");
const bcrypt = require('bcrypt');
const User = db.users;

exports.create = (req,res) => {
    if(!req.body.firstName|
        !req.body.lastName|
        !req.body.email|
        !req.body.password|
        !req.body.company){
        res.status(400).send({
            message: "Empty fields!"
        });
        return;
    }

    var hash = bcrypt.hashSync(req.body.password,10);

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        company: req.body.company
    }

    User.findOne({ where: {email: req.body.email} }).then(function(result){
        if(result === null){
            User.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error"
                });
            });
        }
        else {
            console.log("email already used");
            res.send(null);
        }
    });
};

exports.find =(req,res) =>{
    const user = User.findOne({ where: {email: req.body.email}})
    .then(user => {
        if(user === null){
            console.log("email not found");
            res.send(null);
        }
        else{
            if(bcrypt.compareSync(req.body.password,user.password)){
                console.log("connected");
                console.log(user.get({ plain: true }));
                res.send(user);
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