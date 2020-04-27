const Koa = require('koa');
const routes = require('./routes/index');
const bodyParser = require('koa-bodyparser');
const chalk = require('chalk');
const config = require('./config/default');
const mongoodb = require('./mongodb/db');
var app = new Koa();

// 错误处理中间件 koa-json-error
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || error.statusCode || 500;
    ctx.body = error.message || '服务器出错';
  }
})


app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method === 'OPTIONS') {
    ctx.status = 200;
  } else {
    await next();
  }
});

app.use(bodyParser());
routes(app);
// 此处应该加一个中间件处理404
// app.use(router.routes())
//     .use(router.allowedMethods());

app.listen(config.port, () => {
  console.log(chalk.green(`正在监听${config.port}端口`));
});

