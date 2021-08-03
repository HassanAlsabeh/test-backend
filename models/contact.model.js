const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
Phone:String,
Email:String,
Instagram:String,
Facebook:String,
Linkedin:String,
Whatsapp:String,
Github:String
});

const User = mongoose.model('Contact', userSchema);

module.exports = User;