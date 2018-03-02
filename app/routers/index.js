"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const home = require('./home');
const jwt = require('./jwt');
const csrf = require('./csrf');
const router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/jwt', jwt.routes(), jwt.allowedMethods());
router.use('/csrf', csrf.routes(), jwt.allowedMethods());
module.exports = router;
//# sourceMappingURL=index.js.map