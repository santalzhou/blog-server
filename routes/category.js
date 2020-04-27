const Router = require('koa-router');

const category = require('../controller/category');

const router = new Router();


router.get('/getCategory', category.getCategory);

router.get('/addCategory', category.addCategory);

router.get('/deleteCategory', category.deleteCategory);


module.exports = router;
