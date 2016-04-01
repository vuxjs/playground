var app = require('koa')()
var router = require('koa-router')()
var handlebars = require("koa-handlebars")

router.get('/', function *(next) {
  this.body = 'hello'
})

router.get('/api/v1/demo.html', function *(next) {
  if (!this.query.components){
   this.body = 'No Component Specified~'
   return
  }
  this.query.components = this.query.components.split(',').map(function (one){
    return {
      tag: toDash(capitalizeFirstLetter(one)).slice(1),
      umd: 'vux'+one
    }
  })
  this.query.script = this.query.script ? this.query.script.match(/export default \{([\s\S]*?)\}$/)[1]:''
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

app.listen(7001)

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function toDash (str) {
 return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();})
}
