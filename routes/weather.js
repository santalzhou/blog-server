const axios = require('axios');
const Router = require('koa-router');
const router = new Router();

router.get('/weather', (ctx, next) => {
    return axios.get('http://www.tianqiapi.com/api?version=v6&appsecret=8YvlPNrz&appid=23035354').then(function(res) {
        ctx.body = res.data;
        next()
      }).catch(res=>{
          ctx.body = '获取天气信息失败'
          next()
      });
});


module.exports = router
