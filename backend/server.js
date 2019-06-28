const Koa = require('koa');
const logger = require('koa-morgan')
const Router = require('koa-router')
const bodyParser = require('koa-body')()
const models = require('./models')

const server = new Koa();
const router = new Router()

router.post('/new/', bodyParser, async ctx => {
    const Session = await models.Session.create({})
    ctx.body = JSON.stringify(Session);
});

router.post('/save', bodyParser, async ctx => {
        const session = await models.Session.findOne({where: { id: ctx.request.body.id }})
        session.clicks = ctx.request.body.clicks
        session.save()
        ctx.body = JSON.stringify(session);
    }
);

server
.use(logger('tiny'))
.use(router.routes())
.listen(3001)
