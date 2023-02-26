const mongoose = require('mongoose');


const clientSchema  = mongoose.Schema({
    name : {type:String},
    email : {type:String},
    address : {type:String} ,
    note: {type:String},
      userId : {type:String}
    

},{versionKey:false})

const clientModel = mongoose.model("client",clientSchema);


module.exports = {clientModel};

