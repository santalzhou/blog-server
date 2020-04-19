const State = require('../models/state');
const chalk = require('chalk');

// 插入一次即可
const initData = async (ctx, next) => {
  console.log('---------');
  const initValue = {
    userName: '暖云',
    number: 21,
  };
  const data = State.create(initValue);
  if (data) {
    console.log(chalk.yellow('state--数据初始化成功'));
  } else {
    console.log(chalk.yellow('state--数据初始化成功'));
  }
  await next();
};


// 获取列表数量
// const getInitState = async (ctx, next) => {
//   const data = await State.findOne();
//   if (data) {
//     console.log(chalk.yellow('state--获取博客数量成功', data));
//     ctx.state.number = data.number;
//     ctx.state.name = data.userName;
//   } else {
//     console.log(chalk.yellow('state--获取博客数量失败'));
//   }
//   await next();
// };


module.exports = {
  initData,
  // getInitState,
};