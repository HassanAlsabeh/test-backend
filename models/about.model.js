const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
title1:String,
description1:String,
title2:String,
description2:String,
title3:String,
description3:String,
title4:String,
description4:String

});

const User = mongoose.model('About', userSchema);

module.exports = User;