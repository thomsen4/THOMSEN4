var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var gradesSchema = new Schema({
    name: {type: String, require:true},
    grade: {type: String, require:true}
});

module.exports = 
 Mongoose.model('Grades', gradesSchema);