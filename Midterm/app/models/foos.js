var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var fooSchema = new Schema({
    Foo: { type: String, require: true },
    Woo: { type: Number },
    DateDue: { type: Date, default: Date.now }
});

module.exports =
    Mongoose.model('Foo', fooSchema);