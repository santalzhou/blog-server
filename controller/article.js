const Artical = require('../models/artical');
const chalk = require('chalk');

// 新增文章
const create = async (ctx, next) => {
  const artical = ctx.request.body;
  // 对于非promise对象，比如箭头函数，同步表达式等等，await等待函数或者直接量的返回，而不是等待其执行结果
  // 对于promise对象，await会阻塞函数执行，等待promise的resolve返回值，作为await的结果，然后再执行下下一个表达式
  const data = await Artical.create(artical);
  console.log(chalk.yellow(data));
  if (data) {
    ctx.body = {
      success: true,
      message: '插入成功',
    };
  } else {
    ctx.body = {
      success: false,
      message: '插入出错',
    };
  }
  await next();
};

// 获取文章列表
const getList = async (ctx, next) => {
  const page = ctx.request.body.page;
  const pageSize = ctx.request.body.pageSize;
  const number = await Artical.count();
  if (!number) {
    ctx.body = {
      success: true,
      total: 0,
      list: []
    };
    await next();
  } else {
    if (number > pageSize * (page - 1)) {
      const list = await Artical.find().limit(pageSize).skip(pageSize * (page - 1));
      if (list) {
        ctx.body = {
          success: true,
          total: number,
          list,
        };
      }
      await next();
    } else {
      ctx.throw(500, '获取文章列表出错');
    }
  }
};

module.exports = {
  create,
  getList,
};