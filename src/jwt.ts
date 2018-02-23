import * as Koa from 'koa';
import * as mongoose from 'mongoose';
const bodyParser = require('koa-bodyParser');
const path = require('path');
const resource = require('koa-static');
const views = require('koa-views');
const jwt = require('koa-jwt');
const routers = require('./routers');
const config = require('./config/config');

mongoose.connect(config.connect);

interface Options {
  [propName: string]: any;
}

interface FileInfo {
  path: string;
  file: string;
}

class App {

  options: Options;
  app: Koa;

  constructor(options: Options = {}) {
    if (!options.APP_PATH) {
      options.APP_PATH = path.join(options.ROOT_PATH, '../app');
    }
    this.options = options;
    this.app = new Koa();
  }
  /**
   * start watcher
   */
  startWatcher() {
    const Watcher = this.options.watcher;
    const Compiler = this.options.compiler;
    if (!Watcher || !Compiler) {
      return false;
    }
    const compiler = new Compiler();
    const instance = new Watcher({
      srcPath: path.join(this.options.ROOT_PATH, '../src'),
      outPath: this.options.APP_PATH,
      diffPath: this.options.APP_PATH
    }, (fileInfo: FileInfo) => {
      compiler.transpiler({
        srcPath: fileInfo.path,
        outPath: this.options.APP_PATH,
        file: fileInfo.file,
      });
    });
    instance.watch();
  }
  /**
   * load middleware
   */
  load() {
    // 静态资源
    this.app.use(resource(path.join( __dirname,  '../static')));
    // 加载模板引擎
    this.app.use(views(path.join(__dirname, '../src/views'), {
      extension: 'ejs'
    }));
    // 请求处理
    this.app.use(bodyParser());
    // 权限校验失败处理中间件
    this.app.use((ctx, next) => {
      return next().catch((err) => {
        if (401 === err.status) {
          ctx.status = 401;
          ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
          throw err;
        }
      });
    });
    // 验证
    this.app.use(jwt({
      secret: config.secret,
    }).unless({
      path: ['/jwt/register', '/jwt/login']
    }));
    // 路由
    this.app.use(routers.routes()).use(routers.allowedMethods());
  }
  /**
   * run
   */
  run() {
    // 开发环境时启用编译和重启功能
    if (this.options.env === 'development') {
      this.startWatcher();
    }
    // 加载中间件
    this.load();
    // 启动服务
    this.app.listen(this.options.prot);
  }
}

module.exports = App;
