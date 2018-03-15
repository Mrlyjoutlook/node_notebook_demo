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
const path = require("path");
const fs = require("fs-extra");
const crypto = require('crypto');
class HttpCache {
    index(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.render('httpCache', {
                title: 'http cache demo'
            });
        });
    }
    cache(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let stats;
            const rootPath = path.resolve(__dirname, '../../static', ctx.params.name);
            if (ctx.params.name === 'li.json') {
                stats = yield fs.stat(rootPath);
                ctx.set('Content-Length', String(stats.size));
                if (ctx.get('if-modified-since') &&
                    ctx.get('if-modified-since') === stats.mtime.toUTCString()) {
                    ctx.status = 304;
                    return;
                }
                else {
                    ctx.set('Last-Modified', stats.mtime.toUTCString());
                    ctx.body = fs.createReadStream(rootPath);
                }
            }
            if (ctx.params.name === 'ei.json') {
                function getHash(str) {
                    const chash = crypto.createHash('sha1');
                    return chash.update(str).digest('base64');
                }
                const file = yield fs.readFile(rootPath);
                const hash = getHash(file);
                if (ctx.get('if-none-match') && ctx.get('if-none-match') === hash) {
                    ctx.status = 304;
                    return;
                }
                else {
                    ctx.set('Etag', hash);
                    ctx.body = fs.createReadStream(rootPath);
                }
            }
        });
    }
}
module.exports = new HttpCache();
//# sourceMappingURL=module.js.map