const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");

const port = process.env.PORimgT || 5003;

require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const aboutAdd = require("./routes/about");
app.use("/about", aboutAdd);
const homeAdd = require("./routes/home");
app.use("/home", homeAdd);
// const homeAdd = require('./routes/home');
// app.use('/home', homeAdd);

const aboutedit = require("./routes/edit");
app.use("/abouts", aboutedit);

const projects = require("./routes/projects");
app.use("/project", projects);

const Admins = require("./routes/admin");
app.use("/login", Admins);

const experiences = require("./routes/experiences");
app.use("/experience", experiences);

const contactAdd = require("./routes/contact");
app.use("/contact", contactAdd);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
