import * as koa from 'koa';
import * as path from 'path';
import * as send from 'koa-send';

class HttpCache {
  async index(ctx: koa.Context) {
    await ctx.render('httpCache', {
      title: 'http cache demo'
    });
  }
  async cache(ctx: koa.Context) {
    // console.log(ctx.fresh);
    // if (ctx.fresh) {
    //   ctx.status = 304;
    //   return;
    // }

    await send(ctx, ctx.params.name, {
      root: path.resolve(__dirname, '../../static'),
      setHeaders: (res, path, stats) => {
        console.log(path);
        console.log(stats);
        res.setHeader('Last-Modified', Date());
        res.setHeader('Cache-Control', '30');
      }
    });
  }
}

module.exports = new HttpCache();
