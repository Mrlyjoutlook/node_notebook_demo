"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require('koa-bodyParser');
const path = require('path');
const resource = require('koa-static');
const views = require('koa-views');
const CSRF = require('koa-csrf');
const session = require('koa-session');
const routers = require('./routers');
const config = require('./config/config');
class App {
    constructor(options = {}) {
        if (!options.APP_PATH) {
            options.APP_PATH = path.join(options.ROOT_PATH, '../app');
        }
        this.options = options;
        this.app = new Koa();
        this.app.keys = ['some secret hurr'];
    }
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
        }, (fileInfo) => {
            compiler.transpiler({
                srcPath: fileInfo.path,
                outPath: this.options.APP_PATH,
                file: fileInfo.file
            });
        });
        instance.watch();
    }
    load() {
        this.app.use(resource(path.join(__dirname, '../static')));
        this.app.use(views(path.join(__dirname, '../src/views'), {
            extension: 'ejs'
        }));
        this.app.use(bodyParser());
        this.app.use(session({
            key: config.cookie,
            maxAge: 86400000,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: false,
            renew: false
        }, this.app));
        this.app.use(new CSRF({
            invalidSessionSecretMessage: 'Invalid session secret',
            invalidSessionSecretStatusCode: 403,
            invalidTokenMessage: 'Invalid CSRF token',
            invalidTokenStatusCode: 403,
            excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
            disableQuery: false
        }));
        this.app.use(routers.routes()).use(routers.allowedMethods());
    }
    run() {
        if (this.options.env === 'development') {
            this.startWatcher();
        }
        this.load();
        this.app.listen(this.options.prot);
    }
}
module.exports = App;
//# sourceMappingURL=csrf.js.map