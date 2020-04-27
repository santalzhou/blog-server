const Category = require('../models/category');
const url = require('url');

// 获取分类
const getCategory = async (ctx, next) => {
  const list = await Category.find();
  if (list) {
    ctx.body = {
      success: true,
      list,
    };
  } else {
    ctx.body = {
      success: false,
      message: '获取分类列表失败',
    };
  }
  await next();
};

// 添加分类 post
const addCategory = async (ctx, next) => {
  const query = url.parse(ctx.request.url, true).query;
  if (query && query.name) {
    const data = await Category.create({type: query.name,});
    if (data) {
      ctx.body = {
        success: true,
        message: '添加分类成功',
      };
    } else {
      ctx.throw(500, '添加分类失败');
    }
  } else {
    ctx.throw(500, '添加分类失败');
  }
  next();
};

// 删除分类 get
const deleteCategory = async (ctx, next) => {
  const query = url.parse(ctx.request.url, true).query;
  if (query && query.id) {
    const data = await Category.deleteOne({_id: query.id,});
    if (data) {
      ctx.body = {
        success: true,
        message: '分类删除成功',
      };
    } else {
      ctx.throw(500, '分类删除失败');
    }
  } else {
    ctx.throw(500, '分类删除失败');
  }
  next();
};


module.exports = {
  getCategory,
  addCategory,
  deleteCategory,
};