import * as Router from 'koa-router';

const csrf = require('../controllers/csrf');
const router = new Router();

router.get('/', csrf.index);
router.post('/register', csrf.register);

module.exports = router;
