"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken = require('jsonwebtoken');
const UserModal = require('../models/users');
const config = require('../config/config');
class Jwt {
    login(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = ctx.request;
            try {
                const user = yield UserModal.findOne({ username: body.username });
                if (!user) {
                    ctx.status = 401;
                    ctx.body = {
                        message: '用户名错误',
                    };
                    return false;
                }
                if (body.password === user.password) {
                    ctx.status = 200;
                    ctx.body = {
                        message: '登录成功',
                        data: {
                            id: user._id,
                            token: jsonwebtoken.sign({
                                data: user._id,
                            }, config.secret, {
                                expiresIn: 60 * 2,
                            }),
                        }
                    };
                }
                else {
                    ctx.status = 401;
                    ctx.body = {
                        message: '密码错误',
                    };
                }
            }
            catch (error) {
                ctx.throw(500);
            }
        });
    }
    register(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = ctx.request;
            try {
                if (!body.username || !body.password) {
                    ctx.status = 400;
                    ctx.body = {
                        error: '接口期望接受到具有username, password的object',
                    };
                    return false;
                }
                let user = yield UserModal.find({ username: body.username });
                if (!user.length) {
                    const newUser = new UserModal({
                        username: body.username,
                        password: body.password
                    });
                    user = yield newUser.save();
                    ctx.status = 200;
                    ctx.body = {
                        message: '注册成功',
                        data: {
                            id: user._id,
                        }
                    };
                }
                else {
                    ctx.status = 406;
                    ctx.body = {
                        message: '当前用户已经存在',
                    };
                }
            }
            catch (error) {
                ctx.throw(500);
            }
        });
    }
    users(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = ctx.state.user;
                const user = yield UserModal.findOne({ _id: data });
                ctx.status = 200;
                ctx.body = {
                    message: user.username,
                };
            }
            catch (err) {
                ctx.throw(500);
            }
        });
    }
}
module.exports = new Jwt();
//# sourceMappingURL=module.js.map