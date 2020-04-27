const weather =  require('./weather');
const artical = require('./artical');
const category = require('./category');


module.exports =  app =>{
  app.use(weather.routes());
  app.use(artical.routes());
  app.use(category.routes());
};