const mongoose = require('mongoose');
const config = require('../config/default');
const chalk = require('chalk');
// {useMongoClient:true}
mongoose.connect(config.url+'blog');
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open' ,() => {
  console.log( chalk.green('连接数据库成功') );
});

db.on('error', function(error) {
  console.error(
    chalk.red('Error in MongoDb connection: ' + error)
  );
  //  在所有连接关闭时解析，或在发生第一个错误时拒绝。
  // 对所有连接 并行运行close
  mongoose.disconnect(()=>{
    console.log(chalk.red('错误或其他原因导致关闭了所有连接'));
  });
});

db.on('close', function() {
  console.log(
    chalk.red('数据库断开，请重新连接数据库')
  );
  // mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

module.exports =  db;
