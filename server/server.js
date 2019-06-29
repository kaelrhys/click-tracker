const Koa = require('koa');
const logger = require('koa-morgan')
const Router = require('koa-router')
const bodyParser = require('koa-body')()
const models = require('./models')
const cors = require('@koa/cors');

const server = new Koa();
const router = new Router()

const PORT = 8080;

var corsOptions = {
	origin: '*'
};

router.post('/new/', bodyParser, async ctx => {
    // const Session = await models.Session.create({})
    ctx.body = JSON.stringify(ctx.request.body)
})

router.post('/save/', bodyParser, async ctx => {
        let session;
        if (ctx.request.body.sessionId) {
            session = await models.Session.findOne({where: { id: ctx.request.body.sessionId }})
            session.clicks = ctx.request.body.clicks
            session.save()
        } else {
            session = await models.Session.create({ clicks: ctx.request.body.clicks })
        }
        ctx.body = JSON.stringify(session)
    }
)

server
.use(cors(corsOptions))
.use(logger('tiny'))
.use(router.routes())
.listen(PORT)

console.log(`Running on ${PORT}`);