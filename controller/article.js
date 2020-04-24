const Artical = require('../models/artical');
const url = require('url');
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

// 获取文章列表, 搜索
const getList = async (ctx, next) => {
  console.log(chalk.yellow(JSON.stringify(ctx.request.url)))
  let query = url.parse(ctx.request.url, true).query;
  const page = query.page;
  const pageSize = query.pageSize;
  const search = query.search;
  // console.log(chalk.red(page, pageSize, search));

  let moduleQuery = null;
  if(search){
    moduleQuery = {"title": {$regex: search}};
  }else{
    moduleQuery = {};
  }

// console.log(JSON.stringify(moduleQuery), moduleQuery.count);

  const number = await Artical.count(moduleQuery);
  console.log(chalk.green(number));

  if (!number) {
    ctx.body = {
      success: true,
      total: 0,
      list: []
    };
    await next();
  } else {
    if (number > pageSize * (page - 1)) {
      const list = await Artical.find(moduleQuery).limit(Number(pageSize)).skip(pageSize * (page - 1)).sort({date: -1});
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

// 获取文章详情
const getDetail = async (ctx, next) =>{
  const id = ctx.request.url.split('?id=')[1];
  const data = await Artical.findOne({_id: id});
  if(!data){
    ctx.body = {
      success: false,
      message: '文章查找失败'
    }
  }else{
    ctx.body = {
      success: true,
      artical: data
    }
  }
  await next();
}

module.exports = {
  create,
  getList,
  getDetail
};