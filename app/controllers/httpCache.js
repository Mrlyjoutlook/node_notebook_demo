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
const send = require("koa-send");
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
            yield send(ctx, ctx.params.name, {
                root: path.resolve(__dirname, '../../static'),
                setHeaders: (res, path, stats) => {
                    console.log(path);
                    console.log(stats);
                    res.setHeader('Last-Modified', Date());
                    res.setHeader('Cache-Control', '30');
                }
            });
        });
    }
}
module.exports = new HttpCache();
//# sourceMappingURL=module.js.map