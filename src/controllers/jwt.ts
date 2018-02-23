const jsonwebtoken = require('jsonwebtoken');
const UserModal = require('../models/users');
const config = require('../config/config');

class Jwt {
  async login(ctx: any) {
    const { body } = ctx.request;
    try {
      const user = await UserModal.findOne({ username: body.username });
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
              expiresIn: 60 * 2, // 设置token有效期
            }),
          }
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          message: '密码错误',
        };
      }
    } catch (error) {
      ctx.throw(500);
    }
  }

  async register(ctx: any) {
    const { body } = ctx.request;
    try {
      if (!body.username || !body.password) {
        ctx.status = 400;
        ctx.body = {
          error: '接口期望接受到具有username, password的object',
        };
        return false;
      }
      let user = await UserModal.find({ username: body.username });
      if (!user.length) {
        const newUser = new UserModal({
          username: body.username,
          password: body.password
        });
        user = await newUser.save();
        ctx.status = 200;
        ctx.body = {
          message: '注册成功',
          data: {
            id: user._id,
          }
        };
      } else {
        ctx.status = 406;
        ctx.body = {
          message: '当前用户已经存在',
        };
      }
    } catch (error) {
      ctx.throw(500);
    }
  }

  async users(ctx: any) {
    try {
      const { data } = ctx.state.user;
      const user = await UserModal.findOne({ _id: data });
      ctx.status = 200;
      ctx.body = {
        message: user.username,
      };
    } catch (err) {
      ctx.throw(500);
    }
  }
}

module.exports = new Jwt();
