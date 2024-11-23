const mongoose  = require('mongoose');
const Schema =  mongoose.Schema;

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password: String,
    dateofBirth: Date
});

module.exports = User;

