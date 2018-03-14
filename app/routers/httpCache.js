"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const httpCache = require('../controllers/httpCache');
const router = new Router();
router.get('/', httpCache.index);
router.get('/cache/:name', httpCache.cache);
module.exports = router;
//# sourceMappingURL=httpCache.js.map