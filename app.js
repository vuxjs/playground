var app = require('koa')()
var router = require('koa-router')()
var handlebars = require("koa-handlebars")

router.get('/', function *(next) {
  this.body = 'hello'
})

router.get('/api/v1/demo.html', function *(next) {
  this.query.components = this.query.components.split(',').map(function (one){
    return one.toLowerCase()
  })
  yield this.render("code", {
    title: "demo",
    data: this.query
  });
})

app.use(handlebars({
  helpers: {
    capitalizeFirstLetter: capitalizeFirstLetter
  }
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8082)

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}