const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    title: String,
    content: String,
    date:{type: Date, default: Date.now},
    meta: Array,
    modiDate: {type: Date, defaul: Date.now}, //修改时间
})


const Artical = mongoose.model('Artical', adminSchema);


module.exports =  Artical;
