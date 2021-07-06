const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5001;


require('dotenv').config();

const app = express();

app.use(cors());
app.use (express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true,useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");

})


const aboutAdd = require('./routes/about');
app.use('/about', aboutAdd);

const homeAdd = require('./routes/home');
app.use('/home', homeAdd);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

});