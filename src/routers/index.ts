import * as Router from 'koa-router';

const home = require('./home');
const jwt = require('./jwt');
const csrf = require('./csrf');
const httpCache = require('./httpCache');

const router = new Router();

router.use('/', home.routes(), home.allowedMethods());

// json-web-token
router.use('/jwt', jwt.routes(), jwt.allowedMethods());
// web safe csrf
router.use('/csrf', csrf.routes(), jwt.allowedMethods());
// http cache
router.use('/httpCache', httpCache.routes(), httpCache.allowedMethods());

module.exports = router;
