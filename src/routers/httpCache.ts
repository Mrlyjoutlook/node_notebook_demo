import * as Router from 'koa-router';

const httpCache = require('../controllers/httpCache');
const router = new Router();

router.get('/', httpCache.index);

router.get('/cache/:name', httpCache.cache);

module.exports = router;
