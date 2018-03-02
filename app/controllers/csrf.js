var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Csrf {
    index(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.method === 'GET') {
                yield ctx.render('csrf', {
                    title: 'web safe csrf',
                    csrf: ctx.csrf
                });
            }
        });
    }
    register(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = ctx.request;
            try {
                ctx.body = 'success!';
            }
            catch (error) {
                ctx.throw(500);
            }
        });
    }
}
module.exports = new Csrf();
//# sourceMappingURL=csrf.js.map