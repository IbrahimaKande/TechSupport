const db = require("../model");
const { use } = require("../routes/tech.routes");
const User = db.users;
const Op = db.Sequelize.Op;

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

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        company: req.body.company
    }

    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
};

exports.find =(req,res) =>{
    const email = req.query.email;
    const password = req.body.password;
    let condition = email ? {email:{[Op.iLike]:`%${email}%`}} : null;

    Tech.findOne({ where: condition})
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred"
        });
      });
};