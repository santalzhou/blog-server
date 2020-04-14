const Artical = require('../models/artical')
const chalk = require('chalk')

// 新增文章
const create = async (ctx, next) => {
  const artical = ctx.request.body;
  // 对于非promise对象，比如箭头函数，同步表达式等等，await等待函数或者直接量的返回，而不是等待其执行结果
  // 对于promise对象，await会阻塞函数执行，等待promise的resolve返回值，作为await的结果，然后再执行下下一个表达式
  const data = await Artical.create(artical);
  console.log(chalk.yellow(data))
  if (data) {
    ctx.body = {
      success: true,
      message: '插入成功'
    }
  } else {
    ctx.body = {
      success: false,
      message: '插入出错'
    }
  }
  next()
}

// 获取文章列表
const getList = async (ctx, next) =>{
  const page = ctx.request.body.page; // ---page逻辑暂时没写
  const list = await Artical.find();
  if(list){
    ctx.body = {
      success: true,
      list
    }
  }else {
    ctx.body = {
      success: false,
      message: '获取列表出错'
    }
  }
  next()
}

module.exports = {
  create,
  getList
}