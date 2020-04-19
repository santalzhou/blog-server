const weather =  require('./weather');
const artical = require('./artical');

module.exports =  app =>{
  app.use(weather.routes());
  app.use(artical.routes());
};