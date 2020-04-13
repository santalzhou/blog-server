const axios = require('axios');
const Router = require('koa-router');

const artical = require('../controller/article')

const router = new Router();


router.post('/write', artical.create);


module.exports = router
