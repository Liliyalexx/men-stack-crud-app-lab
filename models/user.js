const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String, 
        requires:true, 
        unique:true,
    },
    password:{
        type:String,
        required: true
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;