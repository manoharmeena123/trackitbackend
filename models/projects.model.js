const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const projectSchema  = mongoose.Schema({

    projectName : {type:String},
    clientId : {type:String},
    clientName :{type:String}, 
    userId : {type:String},
    clientId : {type:Schema.Types.ObjectId,ref:"client"},
     timeTracked : {type:Number},
     money : {type:Number},
    star : {type:Boolean,default:false},
    access : {type:String, enum:["public","private"],default:"public"},

    

},{versionKey:false})

const ProjectModel = mongoose.model("project",projectSchema);


module.exports = {ProjectModel};
