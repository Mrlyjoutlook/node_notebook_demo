"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const csrf = require('../controllers/csrf');
const router = new Router();
router.get('/', csrf.index);
router.post('/register', csrf.register);
module.exports = router;
//# sourceMappingURL=csrf.js.map