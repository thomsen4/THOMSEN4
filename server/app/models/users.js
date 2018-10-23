var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, require:true},
    lastName: {type: String, require:true},
    active: {type: Boolean, default:true},
    role: {type: String, enum: ['admin','user','staff'], required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    dateRegistered: {type: Date, default: Date.now}    
});

module.exports = 
 Mongoose.model('User', userSchema);
