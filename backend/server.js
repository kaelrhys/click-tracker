const Koa = require('koa');
const logger = require('koa-morgan')
const Router = require('koa-router')
const bodyParser = require('koa-body')()

const server = new Koa();
const router = new Router()


router.get('/session/', ctx => {
    ctx.body = 'I am root!'
});

router.post('/update-session/', ctx => {
    ctx.body = {
      something: 'something here'
    }
})
  
router.get('/test', ctx => {
    ctx.body = 'Test Route'
})


server
.use(logger('tiny'))
.use(router.routes())
.listen(3001)
