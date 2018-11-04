var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var helpTicketContentSchema = new Schema({
    personID: {type: Schema.Types.ObjectId},
    content: {type: String},
    helpTicketID: {type: Schema.Types.ObjectId},
    file: {
        fileName: {type: String},
        originalFileName: {type: String}
    },
    dateCreated: {type: Date, default: Date.now}      
});

module.exports = 
 Mongoose.model('HelpTicketContent', helpTicketContentSchema);

 var helpTicketSchema = new Schema({
    title: {type: String, require: true},
    personID: {type: Schema.Types.ObjectId, require: true},    
    ownerID: {type: Schema.Types.ObjectId},
    status: {type: String, enum: ['new','inProcess','closed'], require: true},
    dateCreated: {type: Date, default: Date.now}      
});

module.exports = 
 Mongoose.model('HelpTicket', helpTicketSchema);
