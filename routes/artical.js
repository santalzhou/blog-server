const Router = require('koa-router');

const artical = require('../controller/article');

const router = new Router();


router.post('/write', artical.create);
router.get('/list', artical.getList); // get更合适
router.get('/detail', artical.getDetail);


module.exports = router;
