const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema({
  userName: String,
  number: Number, //博客数量
});


const State = mongoose.model('State', stateSchema);

module.exports =  State;
