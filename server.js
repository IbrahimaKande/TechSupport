const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./model");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync database.");
});

let corsOptions = {
  origin: "http://localhost:8081"
};

let techRoutes = require("./routes/tech.routes");
let userRoutes = require("./routes/user.routes");

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to TechSupport." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use('/tech/',techRoutes);
app.use('/user/',userRoutes);