const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
title:String,
description:String
});

const User = mongoose.model('Home', userSchema);

module.exports = User;