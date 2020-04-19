const Router = require('koa-router');

const artical = require('../controller/article');

const router = new Router();


router.post('/write', artical.create);
router.post('/list', artical.getList);


module.exports = router;
