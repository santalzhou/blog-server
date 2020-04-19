const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSChema = new Schema({
  userName: String,
  number: Number, //博客数量
});


const State = mongoose.model('State', stateSChema);

module.exports =  State;
