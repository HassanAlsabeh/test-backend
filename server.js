const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const homeRoute = require('./routes/home');
const multer = require("multer");
const port = process.env.PORT || 5004;
const path = require("path");

 

require('dotenv').config();

const app = express();

app.use(cors());
app.use (express.json());

const uri = process.env.ATLAS_URI;
//connect to mongoose
mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDb"))
.catch((err) => console.log(err));
//console.log("hello");
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// })

//upload images 


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, req.body.name);
//     },
//   });
  
//   const upload = multer({ storage: storage });
//   app.post("/upload", upload.single("file"), (req, res) => {
//     res.status(200).json("File has been uploaded");
//   });

// // Multer config
// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//       let ext = path.extname(file.originalname);  
//       if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//         cb(new Error("File type is not supported"), false);
//         return;
//       }
//       cb(null, true);
//     },
//   });

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myImage');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
const aboutAdd = require('./routes/about');
app.use('/about', aboutAdd);

const homeAdd = require('./routes/home');
app.use('/home', homeAdd);

app.use(express.static(path.join(__dirname, "./public"))) 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

});
