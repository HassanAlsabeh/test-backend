const mongoose = require('mongoose');
const cors = require("cors");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    certificate: {
        type: String,
        required:true
    },
    certificatedesc: {
      type: String,
      required:true
    },
    profile: {
      type: String,
      required:true
    },
    profiledesc: {
        type: String,
        required:true
      },
      languages: {
        type: String,
        required:true
      },
      languagesdesc: {
        type: String,
        required:true
      },
      programs: {
        type: String,
        required:true
      },
      programsdesc: {
        type: String,
        required:true
      },
      image: {
        type: String,
        required:true
      }
    });



const User = mongoose.model('About', userSchema);

module.exports = User;