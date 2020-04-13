const Artical = require('../models/artical')
const chalk = require('chalk')

// 新增文章
const create = async (ctx, next) => {
    // console.log(chalk.yellow(JSON.stringify(ctx.request.body)));
    const artical = ctx.request.body;
    await Artical.create(artical, (err, res) => {
        if (err) {
            console.log(chalk.yellow(err));
            ctx.body = '发布失败，请稍后试';
        } else {
            ctx.status = 200;
            ctx.body = {success: true, messag: res}; // save 也是插入
        }
        console.log(chalk.blue(res));
        
    })
    ctx.body = 'ok' ////////////---------------------------------------------这里不对  await的执行顺序不对
    // next()
    console.log(chalk.blue(11));
    
}

module.exports = {
    create
}