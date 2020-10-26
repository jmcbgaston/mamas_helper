const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//requirement schema
const ReqSchema = new Schema({
  description: String
, reusable: Boolean 
})

//Mongoose-specific ObjectId data type
const ObjectId = Schema.ObjectId;


//task schema
const TaskSchema = new Schema({
  title: String
, requirements: [ReqSchema]
, owner_id: ObjectId
});

module.exports = Task = mongoose.model('Task', TaskSchema); 