"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const jwt = require('../controllers/jwt');
const router = new Router();
router.post('/login', jwt.login);
router.post('/register', jwt.register);
router.post('/users', jwt.users);
module.exports = router;
//# sourceMappingURL=jwt.js.map